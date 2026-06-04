import path from 'path';
import sqlite from 'node:sqlite';

export class Db {
  private instance: sqlite.DatabaseSync;

  constructor(filePath: string) {
    this.instance = new sqlite.DatabaseSync(filePath);
  }

  get db(): sqlite.DatabaseSync {
    return this.instance;
  }

  open() {
    if (!this.instance.isOpen) {
      this.instance.open();
    }
  }

  close() {
    this.instance.close();
  }

  exec(sql: string) {
    return this.instance.exec(sql);
  }

  clear(tableName: string) {
    this.instance.exec(`DELETE FROM ${tableName}`);
  }
}

export class DbComments extends Db {
  constructor(filePath: string) {
    super(filePath);
  }

  get(id: number) {
    const result = super.db.prepare(`SELECT * FROM comments WHERE id = ?`).get(id);
    return result;
  }

  getAll() {
    const result = super.db.prepare('SELECT * FROM comments').all();
    return result;
  }

  add(text: string) {
    const countResult = super.db.prepare('SELECT count() as "totalComments" FROM comments').get();

    if (countResult) {
      const totalComments = Number(countResult.totalComments);
      const newId = totalComments + 1;
      const result = super.db.prepare('INSERT INTO comments(id, text) VALUES(?, ?)').run(newId, text);
      return result.lastInsertRowid;
    } else {
      throw new Error('Failed to get count of rows from comments table');
    }
  }

  delete(id: number) {
    super.exec(`DELETE FROM comments WHERE id = ${id}`);
  }

  deleteAll() {
    super.clear('comments');
  }
}
