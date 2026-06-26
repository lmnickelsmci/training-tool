const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css',
               '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg',
               '.gif':'image/gif', '.svg':'image/svg+xml', '.webp':'image/webp' };
http.createServer((req, res) => {
  const file = path.join(dir, req.url === '/' ? 'index.html' : req.url);
  try {
    const data = fs.readFileSync(file);
    const ct = mime[path.extname(file).toLowerCase()] || 'text/plain';
    res.writeHead(200, { 'Content-Type': ct });
    res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(3737, () => console.log('Serving on 3737'));
