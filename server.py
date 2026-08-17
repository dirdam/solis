"""Solis web server: serves the standalone HTML/CSS/JS app and its texture image."""

from flask import Flask, Response, send_from_directory

import imaging

app = Flask(__name__, static_folder=None)


@app.route("/")
def index():
    return send_from_directory(".", "index.html")


@app.route("/api/texture.png")
def texture():
    png_bytes = imaging.get_texture_png()
    response = Response(png_bytes, mimetype="image/png")
    response.headers["Cache-Control"] = "public, max-age=3600"
    return response


if __name__ == "__main__":
    print("=" * 60)
    print("Ex parte Solis server")
    print("=" * 60)
    print("\nServer running at http://127.0.0.1:8502")
    print("\nPress Ctrl+C to stop the server")
    print("=" * 60)
    app.run(debug=False, host="127.0.0.1", port=8502)
