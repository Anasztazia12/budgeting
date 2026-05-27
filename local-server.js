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

function shouldRedirectToLocalhost(hostHeader) {
    const host = String(hostHeader || "").toLowerCase();
    return host === "127.0.0.1" || host.startsWith("127.0.0.1:") || host === "[::1]" || host.startsWith("[::1]:");
}

function buildLocalhostUrl(req) {
    const hostHeader = String(req.headers.host || "");
    const [, port = String(PORT)] = hostHeader.split(":");
    const requestPath = req.url || "/";
    return `http://localhost:${port}${requestPath}`;
}

function safePath(urlPath) {
    const decoded = decodeURIComponent(urlPath.split("?")[0]);
    const normalized = path.normalize(decoded).replace(/^([.][.][/\\])+/, "");
    return path.join(ROOT, normalized);
}

const NO_CACHE_EXTENSIONS = new Set([".html", ".js", ".css", ".json", ".webmanifest"]);

function sendFile(filePath, res) {
    fs.readFile(filePath, (error, data) => {
        if (error) {
            res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("Not found");
            return;
        }

        const extension = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[extension] || "application/octet-stream";
        const headers = { "Content-Type": contentType };
        if (NO_CACHE_EXTENSIONS.has(extension)) {
            headers["Cache-Control"] = "no-store, no-cache, must-revalidate";
            headers["Pragma"] = "no-cache";
        }
        res.writeHead(200, headers);
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    if (shouldRedirectToLocalhost(req.headers.host)) {
        res.writeHead(308, {
            Location: buildLocalhostUrl(req, PORT),
            "Content-Type": "text/plain; charset=utf-8"
        });
        res.end("Redirecting to localhost");
        return;
    }

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