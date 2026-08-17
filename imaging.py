"""Texture loading for the Solis web app.

All the rotation, day/night, and 3D-globe rendering now happens client-side in
index.html (see its <script> block) so the hour slider and globe drag redraw
instantly with no server round-trip. This module just prepares and serves the
two static textures the browser can sample: an illustrated projection map, and
a true-color satellite image.
"""

import io
from functools import lru_cache

from PIL import Image

PROJECTION_IMAGE_PATH = "projection.jpg"
TRUE_IMAGE_PATH = "true.png"


@lru_cache(maxsize=1)
def _projection_image():
    img = Image.open(PROJECTION_IMAGE_PATH).convert("RGB")
    # The source texture has a thin white margin plus a black frame line around its
    # edge; left in, it gets rotated into view as a stray curve/line across the globe
    # whenever the seam lands inside the visible area. Crop it out once, up front.
    border = 12
    width, height = img.size
    return img.crop((border, border, width - border, height - border))


@lru_cache(maxsize=1)
def _true_image():
    return Image.open(TRUE_IMAGE_PATH).convert("RGB")


@lru_cache(maxsize=2)
def get_texture_png(which: str = "projection") -> bytes:
    """The base texture for the client-side renderers to sample.

    ``which`` is either "projection" (illustrated equirectangular map) or
    "true" (true-color satellite imagery).
    """
    img = _true_image() if which == "true" else _projection_image()
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()
