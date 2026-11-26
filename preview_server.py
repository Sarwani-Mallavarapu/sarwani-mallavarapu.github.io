"""Local preview of the GECE website, including the 301 redirects.

Run:  python preview_server.py        (or double-click START_PREVIEW.bat)
Then open http://127.0.0.1:8000/

The redirects are read from site/web.config, the same file IIS will use,
so what you test here is what the live server will do.
"""
import http.server, os, re, sys, webbrowser, xml.etree.ElementTree as ET

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "site")
PORT = next((int(a) for a in sys.argv[1:] if a.isdigit()), 8000)

def load_redirects():
    tree = ET.parse(os.path.join(ROOT, "web.config"))
    return {a.get("key").lower(): a.get("value") for a in tree.iter("add") if a.get("key") and a.get("value")}

REDIRECTS = load_redirects()

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def do_GET(self):
        path = self.path.split("?")[0].split("#")[0].lstrip("/").lower()
        if path in REDIRECTS:
            self.send_response(301)
            self.send_header("Location", REDIRECTS[path])
            self.end_headers()
            return
        if path and not os.path.exists(os.path.join(ROOT, path)):
            body = open(os.path.join(ROOT, "404.html"), "rb").read()
            body = body.replace(b"<head>", b'<head><base href="/">', 1)
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()

    do_HEAD = do_GET

if __name__ == "__main__":
    print(f"GECE preview running at http://127.0.0.1:{PORT}/  ({len(REDIRECTS)} redirects loaded)")
    print("Press Ctrl+C to stop.")
    if "--no-browser" not in sys.argv:
        webbrowser.open(f"http://127.0.0.1:{PORT}/")
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
