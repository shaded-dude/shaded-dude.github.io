const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const port = 8787;

http.createServer((request, response) => {
  const requested = request.url === '/' ? '/the-odyssey.html' : decodeURIComponent(request.url.split('?')[0]);
  const target = path.resolve(root, `.${requested}`);
  if (!target.startsWith(root) || !fs.existsSync(target)) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }
  const type = path.extname(target) === '.html' ? 'text/html; charset=utf-8' : 'text/plain; charset=utf-8';
  response.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  fs.createReadStream(target).pipe(response);
}).listen(port, '127.0.0.1', () => console.log(`The Odyssey is ready at http://127.0.0.1:${port}`));
