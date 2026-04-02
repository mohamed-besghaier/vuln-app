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
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    tel TEXT UNIQUE NOT NULL,
    pwd TEXT NOT NULL
);`;

db.run(createTableSql, (err) => {
    if (err) {
        console.error('Error creating users table:', err.message);
    } else {
        console.log('Table (users) ready');
    }
});

module.exports = db;