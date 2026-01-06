const http = require("http");

http.createServer((req, res) => {
  res.end("EXP1 Auto Deploy Working 🚀");
}).listen(3000);

console.log("Server running on port 3000");