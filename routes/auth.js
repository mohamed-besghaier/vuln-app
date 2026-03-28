const express = require('express');
const router = express.Router();

const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath);

router.post('/register', (req, res) => {
    const { username, email, tel, pwd, pwd_a } = req.body;

    if (!username || !email || !tel || !pwd || !pwd_a) {
        return res.status(400).send('<h1>All fields required</h1>');
    }

    if (pwd != pwd_a) {
        return res.status(400).send('<h1>Passwords do not match</h1>');
    }

    req_register = db.prepare('INSERT INTO users (username, email, tel, pwd) VALUES (?, ?, ?, ?)');
    req_register.run(username, email, tel, pwd, function (err) {
        if (err) return res.status(500).send('<h1>User already exists</h1>');
        res.send('<h1>User registered !</h1>');
    });
});

router.post('/', (req, res) => {
    const { email, pwd } = req.body;

    if (!email || !pwd) {
        return res.status(400).send('<h1>All fields required</h1>');
    }

    db.get(
        `SELECT * FROM users WHERE email = ? AND pwd = ?`,
        [email, pwd],
        (err, user) => {
            if (err) return res.status(500).send('<h1>Database error</h1>');
            if (!user) return res.status(401).send('<h1>Invalid credentials</h1>');

            res.send('<h1>Login successfully</h1>');
        }
    );
});

module.exports = router;