const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    if (!req.session.user) return res.redirect('/');
    res.sendFile(path.join(__dirname, '../pages/dashboard.html'));
});

router.get('/me', (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect('/');
    res.json(user);
});

module.exports = router;