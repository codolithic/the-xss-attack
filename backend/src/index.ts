import path from "path";
import express from "express";
import cors from "cors";
import { DbComments } from "./db.js";

const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());

const dbComments = new DbComments(
  path.join(import.meta.dirname, "..", "sqlite.db"),
);
dbComments.open();

app.get("/comments", (req, res) => {
  const comments = dbComments.getAll();
  res.json({ data: comments });
});

app.post("/comments", (req, res) => {
  const { text } = req.body;

  const id = dbComments.add(text);
  res.status(201).json({ data: { id } });
});

app.listen(PORT, () => {
  console.log(`XSS Lab is running at http://localhost:${PORT}`);
});
