const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, Node.js 서버가 실행되었습니다!");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server start: ${PORT}`);
});
