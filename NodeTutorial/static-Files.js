const http =  require('http');
const fs= require('fs');

const server = http.createServer((req, res) => {
 const readStream=  fs.createReadStream('EXAMPLE.txt', 'utf8');
  res.writeHead(200, 'Connected', {'content-type' : 'text/html'});
  readStream.pipe(res);
}).listen(3000);