"""Pure numpy/PIL image rotation logic for the Solis web app (no Streamlit/Plotly)."""

import io
from functools import lru_cache

import numpy as np
from PIL import Image, ImageDraw

IMAGE_PATH = "projection.jpg"

# Fixed viewing geometry: Earth's real axial tilt, no extra sideways rotation.
# Only the hour of day spins the Earth around its polar axis (Z-axis).
AXIAL_TILT_DEG = 24  # ~23.5 degrees precession, rounded as in the original app
SIDEWAYS_DEG = 0


def equirectangular_to_sphere(lon, lat):
    lon_rad = np.radians(lon)
    lat_rad = np.radians(lat)
    x = np.cos(lat_rad) * np.cos(lon_rad)
    y = np.cos(lat_rad) * np.sin(lon_rad)
    z = np.sin(lat_rad)
    return x, y, z


def sphere_to_equirectangular(x, y, z):
    lon_rad = np.arctan2(y, x)
    lat_rad = np.arcsin(np.clip(z, -1, 1))
    return np.degrees(lon_rad), np.degrees(lat_rad)


def rotation_matrix_x(angle):
    a = np.radians(angle)
    c, s = np.cos(a), np.sin(a)
    return np.array([[1, 0, 0], [0, c, -s], [0, s, c]])


def rotation_matrix_y(angle):
    a = np.radians(angle)
    c, s = np.cos(a), np.sin(a)
    return np.array([[c, 0, s], [0, 1, 0], [-s, 0, c]])


def rotation_matrix_z(angle):
    a = np.radians(angle)
    c, s = np.cos(a), np.sin(a)
    return np.array([[c, -s, 0], [s, c, 0], [0, 0, 1]])


def rotate_equirectangular(img, x_angle=0, y_angle=0, z_angle=0):
    """Rotate an equirectangular projection image by tilting/spinning the sphere."""
    img_array = np.array(img)
    height, width = img_array.shape[:2]

    lon_out = np.linspace(-180, 180, width)
    lat_out = np.linspace(90, -90, height)
    lon_grid, lat_grid = np.meshgrid(lon_out, lat_out)

    x, y, z = equirectangular_to_sphere(lon_grid, lat_grid)
    coords = np.stack([x, y, z], axis=-1)

    # Spin (z) is applied first, in the body's own frame — this is Earth turning on its
    # real, already-tilted axis. The axial tilt (x) is applied last, mapping that spinning
    # body into the fixed Sun-facing viewing frame. Applying tilt before spin (the reverse
    # order) makes the tilt itself appear to precess around the viewing axis every rotation,
    # which looks like the viewpoint is swinging around Earth rather than Earth spinning in place.
    R = rotation_matrix_x(x_angle) @ rotation_matrix_y(y_angle) @ rotation_matrix_z(z_angle)
    R_inv = R.T
    rotated_coords = coords @ R_inv.T

    x_rot, y_rot, z_rot = rotated_coords[..., 0], rotated_coords[..., 1], rotated_coords[..., 2]
    lon_src, lat_src = sphere_to_equirectangular(x_rot, y_rot, z_rot)

    px_x = ((lon_src + 180) / 360 * width).astype(int) % width
    px_y = ((90 - lat_src) / 180 * height).astype(int)
    px_y = np.clip(px_y, 0, height - 1)

    return Image.fromarray(img_array[px_y, px_x])


def add_center_circle_overlay(image, circle_radius_fraction=1):
    """Add a semi-transparent overlay with a transparent circle in the center."""
    if image.mode != "RGBA":
        image = image.convert("RGBA")

    result = image.copy()
    overlay = Image.new("RGBA", image.size, (6, 21, 88, 255))
    mask = Image.new("L", image.size, 150)
    draw = ImageDraw.Draw(mask)

    width, height = image.size
    center_x, center_y = width // 2, height // 2
    radius = min(width, height) * circle_radius_fraction / 2

    draw.ellipse(
        [center_x - radius, center_y - radius, center_x + radius, center_y + radius],
        fill=0,
    )
    overlay.putalpha(mask)
    return Image.alpha_composite(result, overlay)


@lru_cache(maxsize=1)
def _base_image():
    return Image.open(IMAGE_PATH).convert("RGB")


def hour_to_z_angle(hour):
    """Earth spins 15 degrees/hour; at 12:00 UTC the Greenwich meridian faces the Sun."""
    return ((12 - hour) * 15) % 360


@lru_cache(maxsize=32)
def get_rotated_png(hour: int) -> bytes:
    hour = max(0, min(24, int(hour)))
    x_angle = -AXIAL_TILT_DEG  # inverted for correct tilt direction, as in the original app
    y_angle = SIDEWAYS_DEG
    z_angle = hour_to_z_angle(hour)

    if x_angle != 0 or y_angle != 0 or z_angle != 0:
        rotated = rotate_equirectangular(_base_image(), x_angle, y_angle, z_angle)
    else:
        rotated = _base_image()

    overlaid = add_center_circle_overlay(rotated)

    buf = io.BytesIO()
    overlaid.save(buf, format="PNG")
    return buf.getvalue()


@lru_cache(maxsize=32)
def get_earth_view_png(hour: int) -> bytes:
    """Earth's own reference frame: no axial tilt, just the daily spin about its own pole."""
    hour = max(0, min(24, int(hour)))
    z_angle = hour_to_z_angle(hour)

    if z_angle != 0:
        rotated = rotate_equirectangular(_base_image(), 0, 0, z_angle)
    else:
        rotated = _base_image()

    buf = io.BytesIO()
    rotated.save(buf, format="PNG")
    return buf.getvalue()
