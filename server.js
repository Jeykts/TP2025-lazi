const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    if (req.url.startsWith('/html/') || req.url.startsWith('/css/') || req.url.startsWith('/js/') || req.url.startsWith('/img/')) {
        filePath = path.join(__dirname, req.url);
    }
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    switch (ext) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.png':
        case '.jpg':
        case '.jpeg':
        case '.gif':
            contentType = 'image/' + ext.slice(1);
            break;
    }
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
