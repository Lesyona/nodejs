const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
}

const server = http.createServer((req, res) => {
    const fullPath = path.join(process.cwd(), req.url);

    if (!fs.existsSync(fullPath)) return res.end('File or directory not found');

    if (isFile(fullPath)) {
        return fs.createReadStream(fullPath).pipe(res);
    }

    let linksList = '';

    fs.readdirSync(fullPath)
        .forEach(fileName => {
            const filePath = path.join(req.url, fileName);
            const absolutePath = path.join(fullPath, fileName);

            if (isFile(absolutePath)) {
                linksList += `<div class="explorer-item file"><a href="${filePath}">${fileName}</a></div>`;
            } else {
                linksList += `<div class="explorer-item folder"><a href="${filePath}">${fileName}</a></div>`;
            }
        });

    const HTML = fs
        .readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
        .replace('##links', linksList);

    res.writeHead(200, 'OK', {
        'Content-Type': 'text/html'
    })

    return res.end(HTML);
});

server.listen(3000);