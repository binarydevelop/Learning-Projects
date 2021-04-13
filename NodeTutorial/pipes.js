const fs= require('fs');
const readStream = fs.createReadStream('testing.txt','utf8');
const writeStream = fs.createWriteStream('EXAMPLE.txt');

readStream.pipe(writeStream);