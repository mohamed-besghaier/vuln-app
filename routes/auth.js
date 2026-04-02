const express = require('express');
const router = express.Router();
const path = require('path');

const db = require('../models/user');

// REGISTER

router.post('/register', (req, res) => {
    const { username, email, tel, pwd, pwd_a } = req.body;

    if (!username || !email || !tel || !pwd || !pwd_a) {
        return res.status(400).send('<h1>All fields required</h1>');
    }

    if (pwd !== pwd_a) {
        return res.status(400).send('<h1>Passwords do not match</h1>');
    }

    const stmt = db.prepare(
        'INSERT INTO users (username, email, tel, pwd) VALUES (?, ?, ?, ?)'
    );

    stmt.run(username, email, tel, pwd, function (err) {
        if (err) return res.status(500).send('<h1>User already exists</h1>');

        res.redirect('/');
    });
});

// LOGIN

router.post('/', (req, res) => {
    const { email, pwd } = req.body;

    if (!email || !pwd) {
        return res.status(400).send('<h1>All fields required</h1>');
    }

    db.get(
        'SELECT * FROM users WHERE email = ? AND pwd = ?',
        [email, pwd],
        (err, user) => {
            if (err) return res.status(500).send('<h1>Database error</h1>');
            if (!user) return res.status(401).send('<h1>Invalid credentials</h1>');

            req.session.user = {
                id: user.id,
                username: user.username,
                tel: user.tel,
                email: user.email
            };

            res.redirect('/dashboard');
        }
    );
});

module.exports = router;