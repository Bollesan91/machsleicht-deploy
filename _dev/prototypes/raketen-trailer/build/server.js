// Mini-Server fuer den Raketen-Prototyp: statische Dateien aus ./www + POST /save (schreibt nach ./www/out).
// Nur lokal (127.0.0.1). Kein Teil des Produkts.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'out');
const PORT = 8778;
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json'
};

fs.mkdirSync(OUT, { recursive: true });

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  if (req.method === 'POST' && url.pathname === '/save') {
    const name = (url.searchParams.get('name') || 'out.bin').replace(/[^A-Za-z0-9._-]/g, '_');
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      const buf = Buffer.concat(chunks);
      const file = path.join(OUT, name);
      fs.writeFileSync(file, buf);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, file, bytes: buf.length }));
      console.log('[save]', file, buf.length, 'bytes');
    });
    return;
  }
  let p = decodeURIComponent(url.pathname);
  if (p === '/') p = '/index.html';
  const file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('not found'); return;
  }
  const ext = path.extname(file).toLowerCase();
  const stat = fs.statSync(file);
  const range = req.headers.range;
  if (range && ext === '.mp4') {
    // Range-Requests, damit <video> spulen kann
    const m = /bytes=(\d+)-(\d*)/.exec(range);
    const start = parseInt(m[1], 10);
    const end = m[2] ? parseInt(m[2], 10) : stat.size - 1;
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1, 'Content-Type': MIME[ext]
    });
    fs.createReadStream(file, { start, end }).pipe(res);
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Content-Length': stat.size, 'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, '127.0.0.1', () => console.log('rakete-proto auf http://127.0.0.1:' + PORT));
