import numpy as np
from PIL import Image, ImageDraw
import streamlit as st
import plotly.graph_objects as go
import matplotlib.pyplot as plt
from matplotlib import cm

def equirectangular_to_sphere(lon, lat):
    """Convert equirectangular coordinates to 3D unit sphere coordinates."""
    # Convert to radians
    lon_rad = np.radians(lon)
    lat_rad = np.radians(lat)
    
    # Convert to 3D coordinates on unit sphere
    x = np.cos(lat_rad) * np.cos(lon_rad)
    y = np.cos(lat_rad) * np.sin(lon_rad)
    z = np.sin(lat_rad)
    
    return x, y, z

def sphere_to_equirectangular(x, y, z):
    """Convert 3D unit sphere coordinates back to equirectangular."""
    # Calculate longitude
    lon_rad = np.arctan2(y, x)
    
    # Calculate latitude
    lat_rad = np.arcsin(np.clip(z, -1, 1))
    
    # Convert to degrees
    lon = np.degrees(lon_rad)
    lat = np.degrees(lat_rad)
    
    return lon, lat

def rotation_matrix_x(angle):
    """Create rotation matrix around X axis."""
    angle_rad = np.radians(angle)
    cos_a = np.cos(angle_rad)
    sin_a = np.sin(angle_rad)
    
    return np.array([
        [1, 0, 0],
        [0, cos_a, -sin_a],
        [0, sin_a, cos_a]
    ])

def rotation_matrix_y(angle):
    """Create rotation matrix around Y axis."""
    angle_rad = np.radians(angle)
    cos_a = np.cos(angle_rad)
    sin_a = np.sin(angle_rad)
    
    return np.array([
        [cos_a, 0, sin_a],
        [0, 1, 0],
        [-sin_a, 0, cos_a]
    ])

def rotation_matrix_z(angle):
    """Create rotation matrix around Z axis."""
    angle_rad = np.radians(angle)
    cos_a = np.cos(angle_rad)
    sin_a = np.sin(angle_rad)
    
    return np.array([
        [cos_a, -sin_a, 0],
        [sin_a, cos_a, 0],
        [0, 0, 1]
    ])

@st.cache_data
def rotate_equirectangular(image_path, x_angle=0, y_angle=0, z_angle=0):
    """Rotate an equirectangular projection image by tilting the sphere."""
    # Load image
    img = Image.open(image_path)
    img_array = np.array(img)
    height, width = img_array.shape[:2]
    
    # Create output array
    output = np.zeros_like(img_array)
    
    # Create coordinate grids for the output image
    lon_out = np.linspace(-180, 180, width)
    lat_out = np.linspace(90, -90, height)
    lon_grid, lat_grid = np.meshgrid(lon_out, lat_out)
    
    # Convert output coordinates to sphere
    x, y, z = equirectangular_to_sphere(lon_grid, lat_grid)
    
    # Stack coordinates for matrix multiplication
    coords = np.stack([x, y, z], axis=-1)
    
    # Create combined rotation matrix. Spin (z) is applied first, in the body's own frame —
    # this is Earth turning on its real, already-tilted axis. The axial tilt (x) is applied
    # last, mapping that spinning body into the fixed Sun-facing viewing frame. Applying tilt
    # before spin (the reverse order) makes the tilt itself precess around the viewing axis
    # every rotation, which looks like the viewpoint swinging around Earth instead of Earth
    # spinning in place.
    R = rotation_matrix_x(x_angle) @ rotation_matrix_y(y_angle) @ rotation_matrix_z(z_angle)
    
    # Apply inverse rotation (we rotate backwards to find source pixels)
    R_inv = R.T
    rotated_coords = coords @ R_inv.T
    
    # Extract rotated coordinates
    x_rot = rotated_coords[..., 0]
    y_rot = rotated_coords[..., 1]
    z_rot = rotated_coords[..., 2]
    
    # Convert back to equirectangular
    lon_src, lat_src = sphere_to_equirectangular(x_rot, y_rot, z_rot)
    
    # Convert to pixel coordinates
    px_x = ((lon_src + 180) / 360 * width).astype(int) % width
    px_y = ((90 - lat_src) / 180 * height).astype(int)
    px_y = np.clip(px_y, 0, height - 1)
    
    # Sample from source image
    output = img_array[px_y, px_x]
    
    return Image.fromarray(output)

def create_3d_earth_visualization(x_angle=0, y_angle=0, z_angle=0, image_path='projection.jpg', resolution=240):
    """Create a 3D visualization of Earth with rotation axis."""
    # Create sphere mesh with moderate resolution
    phi = np.linspace(0, np.pi, resolution)
    theta = np.linspace(0, 2 * np.pi, resolution)
    
    # Create meshgrid
    THETA, PHI = np.meshgrid(theta, phi)
    
    # Sphere coordinates
    x_sphere = np.sin(PHI) * np.cos(THETA)
    y_sphere = np.sin(PHI) * np.sin(THETA)
    z_sphere = np.cos(PHI)
    
    # Load the Earth texture
    img = Image.open(image_path)
    # Resize image to match resolution for simpler mapping
    img_small = img.resize((resolution, resolution), Image.Resampling.LANCZOS)
    img_array = np.array(img_small)
    
    # Create rotation matrix
    R = rotation_matrix_z(z_angle) @ rotation_matrix_y(y_angle) @ rotation_matrix_x(x_angle)
    
    # Apply rotation to sphere
    sphere_points = np.stack([x_sphere.flatten(), y_sphere.flatten(), z_sphere.flatten()])
    rotated_points = R @ sphere_points
    
    x_rot = rotated_points[0].reshape(x_sphere.shape)
    y_rot = rotated_points[1].reshape(y_sphere.shape)
    z_rot = rotated_points[2].reshape(z_sphere.shape)
    
    # Create the figure
    fig = go.Figure()
    
    # Create Surface with texture-like coloring
    # Use the average color intensity as the surface color
    intensity = np.mean(img_array[:, :, :3], axis=2) / 255.0
    
    # Add textured sphere
    fig.add_trace(go.Surface(
        x=x_rot,
        y=y_rot,
        z=z_rot,
        surfacecolor=intensity,
        colorscale=[
            [0, 'rgb(10,40,100)'],      # Deep ocean blue
            [0.3, 'rgb(50,100,200)'],    # Ocean blue
            [0.5, 'rgb(100,200,100)'],   # Coastal green (too green!!!!)
            [0.7, 'rgb(150,150,100)'],   # Land brown
            [1, 'rgb(255,255,255)']      # Snow/ice white
        ],
        showscale=False,
        lighting=dict(
            ambient=0.6,
            diffuse=0.8,
            specular=0.2,
            roughness=0.5
        ),
        hoverinfo='skip'
    ))
    
    # Original axis (before rotation)
    axis_start = np.array([[0], [0], [-1.3]])
    axis_end = np.array([[0], [0], [1.3]])
    
    # Apply rotation to axis
    rotated_axis_start = R @ axis_start
    rotated_axis_end = R @ axis_end
    
    # Add rotated axis
    fig.add_trace(go.Scatter3d(
        x=[rotated_axis_start[0, 0], rotated_axis_end[0, 0]],
        y=[rotated_axis_start[1, 0], rotated_axis_end[1, 0]],
        z=[rotated_axis_start[2, 0], rotated_axis_end[2, 0]],
        mode='lines+text',
        line=dict(color='red', width=6),
        text=['S', 'N'],
        textposition=['bottom center', 'top center'],
        textfont=dict(size=16, color='red'),
        showlegend=False
    ))
    
    # Add equator
    equator_angle = np.linspace(0, 2 * np.pi, 100)
    equator_x = np.cos(equator_angle)
    equator_y = np.sin(equator_angle)
    equator_z = np.zeros_like(equator_angle)
    
    equator_points = np.stack([equator_x, equator_y, equator_z])
    rotated_equator = R @ equator_points
    
    fig.add_trace(go.Scatter3d(
        x=rotated_equator[0],
        y=rotated_equator[1],
        z=rotated_equator[2],
        mode='lines',
        line=dict(color='green', width=4),
        name='Equator',
        showlegend=False
    ))
    
    # Add some meridians
    for lon in [0, 90, 180, 270]:
        meridian_angle = np.linspace(0, 2 * np.pi, 100)
        meridian_x = np.cos(np.radians(lon)) * np.sin(meridian_angle)
        meridian_y = np.sin(np.radians(lon)) * np.sin(meridian_angle)
        meridian_z = np.cos(meridian_angle)
        
        meridian_points = np.stack([meridian_x, meridian_y, meridian_z])
        rotated_meridian = R @ meridian_points
        
        fig.add_trace(go.Scatter3d(
            x=rotated_meridian[0],
            y=rotated_meridian[1],
            z=rotated_meridian[2],
            mode='lines',
            line=dict(color='gray', width=1),
            showlegend=False,
            opacity=0.5
        ))
    
    # Update layout
    fig.update_layout(
        scene=dict(
            xaxis=dict(showticklabels=False, showgrid=False, zeroline=False, title=''),
            yaxis=dict(showticklabels=False, showgrid=False, zeroline=False, title=''),
            zaxis=dict(showticklabels=False, showgrid=False, zeroline=False, title=''),
            camera=dict(
                eye=dict(x=0, y=1.5, z=0)
            ),
            aspectmode='data'
        ),
        showlegend=False,
        margin=dict(l=0, r=0, t=0, b=0),
        height=400
    )
    
    return fig

def add_center_circle_overlay(image, circle_radius_fraction=1):
    """Add a semi-transparent gray overlay with a transparent circle in the center."""
    # Convert PIL Image to RGBA if needed
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # Create a copy to work with
    result = image.copy()
    
    # Create overlay layer with full opacity gray
    overlay = Image.new('RGBA', image.size, (6, 21, 88, 255))
    
    # Create a mask for transparency - 128 for semi-transparent, 0 for fully transparent
    mask = Image.new('L', image.size, 150)  # Semi-transparent gray area
    draw = ImageDraw.Draw(mask)
    
    # Calculate circle parameters
    width, height = image.size
    center_x = width // 2
    center_y = height // 2
    radius = min(width, height) * circle_radius_fraction / 2
    
    # Draw transparent circle (0 = transparent)
    draw.ellipse([center_x - radius, center_y - radius, 
                  center_x + radius, center_y + radius], fill=0)
    
    # Apply the mask to the overlay's alpha channel
    overlay.putalpha(mask)
    
    # Composite the overlay onto the result
    result = Image.alpha_composite(result, overlay)
    
    return result