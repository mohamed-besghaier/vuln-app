const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath);


const createTableSql = `
    CREATE TABLE IF NOT EXISTS files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        filename TEXT NOT NULL,
        filepath TEXT NOT NULL,
        uploaded_at DATETIME,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`;

db.run(createTableSql, function (err) {
    if (err) {
        return console.log('Error creating table(files)', err.message);
    }
    console.log('Table(files) created');
});

db.close((err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('Database connection closed');
});