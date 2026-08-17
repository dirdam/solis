"""Solis web server: serves the standalone HTML/CSS/JS app and its texture image."""

from flask import Flask, Response, request, send_from_directory

import imaging

app = Flask(__name__, static_folder=None)


@app.route("/")
def index():
    # No explicit Cache-Control here previously meant the browser could serve a
    # stale copy of index.html from its heuristic HTTP cache after an edit,
    # with no visible sign anything was wrong (same bug class that hit the old
    # per-hour rotate endpoint earlier in dev — see imaging.py history).
    response = send_from_directory(".", "index.html")
    response.headers["Cache-Control"] = "no-store"
    return response


@app.route("/api/texture.png")
def texture():
    which = "true" if request.args.get("src") == "true" else "projection"
    png_bytes = imaging.get_texture_png(which)
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
