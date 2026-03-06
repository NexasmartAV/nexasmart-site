const http = require("http");
const fs = require("fs");
const path = require("path");
const root = process.cwd();
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};
http.createServer((req, res) => {
  const cleanUrl = req.url.split("?")[0];
  const relativePath = cleanUrl === "/" ? "/index.html" : decodeURIComponent(cleanUrl);
  const filePath = path.join(root, relativePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
      res.end("404 Not Found");
      return;
    }
    res.writeHead(200, {"Content-Type": mime[path.extname(filePath).toLowerCase()] || "application/octet-stream"});
    res.end(data);
  });
}).listen(8000, "127.0.0.1", () => console.log("LISTENING http://127.0.0.1:8000"));
