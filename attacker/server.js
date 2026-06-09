const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "GET" && req.url === "/api/data") {
    console.log("GET /api/data");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Test succeeded!",
      }),
    );
  } else if (req.method === "POST" && req.url === "/api/data") {
    console.log("POST /api/data");
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parsedData = JSON.parse(body);
        console.log("CREDIT CARD DATA", parsedData);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end();
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON payload format" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
