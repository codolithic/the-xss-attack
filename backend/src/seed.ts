import fs from "node:fs/promises";
import path from "path";
import sqlite, { DatabaseSync } from "node:sqlite";

const dbPath = path.join(import.meta.dirname, "..", "sqlite.db");

function closeDbConnection(db: DatabaseSync) {
  if (db.isOpen) {
    db.close();
  }
}

async function execute() {
  const db = new sqlite.DatabaseSync(dbPath);
  closeDbConnection(db);

  await fs.rm(dbPath);

  try {
    db.open();
    db.exec(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY_KEY,
            text TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.exec(`DELETE FROM comments;`);

    const comments = [
      '<div><div><strong>IMPORTANT!</strong>&nbsp;This is the first comment.</div><div style="font-style: italic;">Note: This formatted comment.</div></div>',
      "<div><h2>This is heading</h2><p>This is a html rendering in react app.</p></div>",
    ];

    for (let i = 0; i < comments.length; i++) {
      db.exec(
        `INSERT INTO comments(id, text) VALUES(${i + 1}, '${comments[i]}')`,
      );
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (db.isOpen) {
      db.close();
    }
  }
}

execute();
