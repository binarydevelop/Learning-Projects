const http =  require('http');
const server = http.createServer((req, res) => {
  res.write("Listening");
  res.end();
}).listen(3000);