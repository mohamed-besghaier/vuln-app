const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

const createTableSql = `
CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    filename TEXT NOT NULL,
    filepath TEXT NOT NULL,
    uploaded_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);`;

db.run(createTableSql, (err) => {
    if (err) {
        console.error('Error creating files table:', err.message);
    } else {
        console.log('Table (files) ready');
    }
});

module.exports = db;