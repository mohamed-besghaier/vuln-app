const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');

const dbPath = path.join(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath);

const upload = multer({ dest: path.join(__dirname, '../uploads/') });

// GET /upload — serve the upload page
router.get('/', (req, res) => {
    if (!req.session.user) return res.redirect('/');
    res.sendFile(path.join(__dirname, '../pages/upload.html'));
});

router.get('/files', (req, res) => {
    const user = req.session.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    db.all(
        'SELECT id, filename, filepath, uploaded_at FROM files WHERE user_id = ? ORDER BY id DESC',
        [user.id],
        (err, files) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.json(files);
        }
    );
});

// POST /upload — handle file upload
router.post('/', upload.single('file'), (req, res) => {
    const user = req.session.user;
    const file = req.file;

    if (!file) return res.status(400).send('<h1>Upload a file!</h1>');

    const filename = file.originalname;
    const filepath = file.path;
    const uploaded_at = new Date().toISOString();

    const req_upload = db.prepare(
        'INSERT INTO files (user_id, filename, filepath, uploaded_at) VALUES (?, ?, ?, ?)'
    );

    req_upload.run(user.id, filename, filepath, uploaded_at, function (err) {
        if (err) return res.status(500).send('<h1>Error uploading file</h1>');
        res.redirect('/upload');
    });
});

module.exports = router;
