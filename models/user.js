const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath);

const req = `
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        tel TEXT UNIQUE NOT NULL,
        pwd TEXT NOT NULL
    )`;

db.run(req, function (err) {
    if (err) {
        return console.log('Error creating table(users)', err.message);
    }
    console.log('Table(users) created');
});

db.close((err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('Database connection closed');
});