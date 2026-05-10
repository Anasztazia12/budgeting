const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;

const MIME_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".webmanifest": "application/manifest+json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon"
};

function safePath(urlPath) {
    const decoded = decodeURIComponent(urlPath.split("?")[0]);
    const normalized = path.normalize(decoded).replace(/^([.][.][/\\])+/, "");
    return path.join(ROOT, normalized);
}

function sendFile(filePath, res) {
    fs.readFile(filePath, (error, data) => {
        if (error) {
            res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Not found");
            return;
        }

        const extension = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[extension] || "application/octet-stream";
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    const requestPath = req.url === "/" ? "/index.html" : req.url;
    const absolutePath = safePath(requestPath);

    if (!absolutePath.startsWith(ROOT)) {
        res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Forbidden");
        return;
    }

    fs.stat(absolutePath, (error, stats) => {
        if (!error && stats.isFile()) {
            sendFile(absolutePath, res);
            return;
        }

        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not found");
    });
});

server.listen(PORT, () => {
    console.log(`Budgeting app available at http://localhost:${PORT}`);
});