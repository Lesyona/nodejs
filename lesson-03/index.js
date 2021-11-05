const fs = require('fs');
const readline = require('readline');

const ips = ['89.123.1.41', '34.48.240.111'];
const streams = {};

const lineRead = readline.createInterface({
    input: fs.createReadStream('./access.log', 'utf8')
});

if(ips.length) {
    ips.forEach(item => {
        streams[item] = fs.createWriteStream(`./%${item}%_requests.log`, { flags: 'a', encoding: 'utf8' });
    })
}

lineRead.on('line', function (line) {
    ips.forEach(item => {
        if (line.includes(item)) {
            streams[item].write(line + '\n');
        }
    })
});