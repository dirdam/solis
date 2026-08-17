import streamlit as st
import utils
from PIL import Image

st.title("Ex parte Solis: Earth from the Sun's view")

# Original image
image_path = 'projection.jpg'

# Create columns for layout
col1, col2 = st.columns(2)

st.markdown(
    "Earth is always shown here from **Earth's own reference frame**: the map is oriented "
    "so that Earth's geographical north pole points to the top, exactly as in a standard world map."
)

st.subheader("Original Earth View")
st.image(image_path, caption="Earth from the Earth's view (top = geographical north)", width="stretch")

st.markdown(
    "This project instead asks what a map of Earth would look like from the **Sun's** reference frame. "
    "Picture \"solino\" citizens living on the Sun: to draw a map, they would orient it using the Sun's own "
    "geographical north and the plane of the solar system, not Earth's geographical north. Because Earth's "
    "rotation axis is tilted relative to that plane, the resulting projection is rotated compared to the "
    "familiar Earth-centered map below. Use the slider to explore how the map changes as Earth spins through "
    "the hours of the day."
)

st.subheader("Rotation Controls")

# Create columns for controls and 3D visualization
control_col, viz_col = st.columns([1, 1])

with control_col:
    st.markdown("### Time of day")

    # Original manual rotation controls, kept for reference (replaced by the hour slider below).
    # x_angle = st.slider("X-axis rotation (degrees)", -180, 180, 24, 4) # 23.5 precession
    # y_angle = st.slider("Y-axis rotation (degrees)", -180, 180, 0, 4)
    # z_angle = st.slider("Z-axis rotation (degrees)", -180, 180, 0, 4) - 90 # To show meridian 0 centered
    #
    # st.markdown("""
    # **Rotation Guide:**
    # - **X-axis**: Tilts forward/backward
    # - **Y-axis**: Rotates left/right
    # - **Z-axis**: Spins around poles
    # """)

    hour = st.slider("Hour of the day (UTC)", 0, 24, 12, 1)

    # Fixed axial tilt (23.5° precession) and no extra sideways rotation:
    # only the hour of day spins the Earth around its polar axis.
    x_angle = 24  # 23.5 precession
    y_angle = 0

    # Earth spins 360 degrees every 24 hours (15 degrees/hour). At 12:00 UTC the
    # Greenwich meridian faces the Sun, so it stays centered; other hours rotate
    # the sub-solar meridian accordingly.
    z_angle = (12 - hour) * 15 - 90  # To show meridian 0 centered at 12:00

    st.markdown(
        "Moving the slider spins the Earth around its polar axis to match the selected **hour of the day (UTC)**, "
        "changing which meridian faces the Sun. At 12:00, the Greenwich meridian (0°) is centered, matching solar "
        "noon at that longitude."
    )

with viz_col:
    st.markdown("### 3D Orientation Preview")
    fig = utils.create_3d_earth_visualization(x_angle, y_angle, z_angle, image_path, resolution=240)
    st.plotly_chart(fig, width="stretch", config={'displayModeBar': False})

st.subheader("Rotated Earth View")

z_angle = (z_angle + 90) % 360  # Adjust back for processing
x_angle = -x_angle  # Invert X angle for correct tilt

# Generate and display rotated image with overlay
if x_angle != 0 or y_angle != 0 or z_angle != 0:
    rotated_image = utils.rotate_equirectangular(image_path, x_angle, y_angle, z_angle)
else:
    rotated_image = Image.open(image_path)

# Apply overlay with transparent circle in center
rotated_image_with_overlay = utils.add_center_circle_overlay(rotated_image, circle_radius_fraction=1)
st.image(rotated_image_with_overlay, caption=f"Rotated view at {hour}:00 UTC (X:{x_angle}°, Y:{y_angle}°, Z:{z_angle}°)", width="stretch")

# Add explanation
st.markdown("---")
st.markdown("### How it works")
st.markdown("""
This application demonstrates how Earth would appear from the Sun's perspective at a given hour of the day by:
1. Mapping the equirectangular projection to a 3D sphere
2. Tilting it by Earth's fixed axial tilt (~23.5°) relative to the solar system's plane
3. Spinning it around its polar axis to match the selected hour of the day
4. Reprojecting back to an equirectangular view

- **Axial tilt**: Fixed at Earth's real ~23.5° tilt relative to the orbital plane
- **Hour of the day**: Spins the Earth so the meridian facing the Sun matches the selected time
""")

