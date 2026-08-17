"""Texture loading for the Solis web app.

All the rotation, day/night, and 3D-globe rendering now happens client-side in
index.html (see its <script> block) so the hour slider and globe drag redraw
instantly with no server round-trip. This module just prepares and serves the
one static texture the browser needs to sample.
"""

import io
from functools import lru_cache

from PIL import Image

IMAGE_PATH = "projection.jpg"


@lru_cache(maxsize=1)
def _base_image():
    img = Image.open(IMAGE_PATH).convert("RGB")
    # The source texture has a thin white margin plus a black frame line around its
    # edge; left in, it gets rotated into view as a stray curve/line across the globe
    # whenever the seam lands inside the visible area. Crop it out once, up front.
    border = 12
    width, height = img.size
    return img.crop((border, border, width - border, height - border))


@lru_cache(maxsize=1)
def get_texture_png() -> bytes:
    """The cropped base texture, for the client-side renderers to sample."""
    buf = io.BytesIO()
    _base_image().save(buf, format="PNG")
    return buf.getvalue()
