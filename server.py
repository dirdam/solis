"""Solis web server: serves the standalone HTML/CSS/JS app and rotated-image API."""

from flask import Flask, Response, send_from_directory

import imaging

app = Flask(__name__, static_folder=None)


@app.route("/")
def index():
    return send_from_directory(".", "index.html")


@app.route("/projection.jpg")
def original_image():
    return send_from_directory(".", "projection.jpg")


@app.route("/api/rotate/<int:hour>")
def rotate(hour):
    png_bytes = imaging.get_rotated_png(hour)
    response = Response(png_bytes, mimetype="image/png")
    response.headers["Cache-Control"] = "no-store"
    return response


@app.route("/api/earth/<int:hour>")
def earth_view(hour):
    png_bytes = imaging.get_earth_view_png(hour)
    response = Response(png_bytes, mimetype="image/png")
    response.headers["Cache-Control"] = "no-store"
    return response


if __name__ == "__main__":
    print("=" * 60)
    print("Ex parte Solis server")
    print("=" * 60)
    print("\nServer running at http://127.0.0.1:8502")
    print("\nPress Ctrl+C to stop the server")
    print("=" * 60)
    app.run(debug=False, host="127.0.0.1", port=8502)
