const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const db = require('../models/file');

const upload = multer({
    dest: path.join(__dirname, '../uploads/')
});

// GET serve the page
router.get('/', (req, res) => {
    if (!req.session.user) return res.redirect('/');
    res.sendFile(path.join(__dirname, '../pages/upload.html'));
});

// GET list user's files
router.get('/files', (req, res) => {
    const user = req.session.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    db.all(
        'SELECT id, filename, filepath, uploaded_at FROM files WHERE user_id = ? ORDER BY id DESC',
        [user.id],
        (err, files) => {
            if (err) return res.status(500).json({ error: 'Database error' });

            const result = files.map(f => ({
                id: f.id,
                filename: f.filename,
                url: `/upload/download/${f.id}`,
                uploaded_at: f.uploaded_at
            }));

            res.json(result);
        }
    );
});

// POST handle file upload
router.post('/', upload.single('file'), (req, res) => {
    const user = req.session.user;
    const file = req.file;

    if (!user) return res.status(401).send('Unauthorized');
    if (!file) return res.status(400).send('<h1>Upload a file!</h1>');

    const filename = file.originalname;
    const storedName = file.filename; // multer's random name
    const uploaded_at = new Date().toISOString();

    const stmt = db.prepare(
        'INSERT INTO files (user_id, filename, filepath, uploaded_at) VALUES (?, ?, ?, ?)'
    );

    stmt.run(user.id, filename, storedName, uploaded_at, function (err) {
        if (err) return res.status(500).send('<h1>Error uploading file</h1>');
        res.redirect('/upload');
    });
});

// Download file 
router.get('/download/:id', (req, res) => {
    const user = req.session.user;
    if (!user) return res.status(401).send('Unauthorized');

    const fileId = req.params.id;
    db.get('SELECT filename, filepath FROM files WHERE id = ? AND user_id = ?', [fileId, user.id], (err, file) => {
        if (err || !file) return res.status(404).send('File not found');

        const filePath = path.join(__dirname, '../uploads', file.filepath);
        res.download(filePath, file.filename); // original filename
    });
});

// DELETE file
router.delete('/delete/:id', (req, res) => {
    const user = req.session.user;
    if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const fileId = req.params.id;

    db.get('SELECT filepath FROM files WHERE id = ? AND user_id = ?', [fileId, user.id], (err, file) => {
        if (err || !file) return res.status(404).json({ success: false, message: 'File not found' });

        const fs = require('fs');
        const filePath = path.join(__dirname, '../uploads', file.filepath);
        fs.unlink(filePath, (err) => {
            if (err) console.error('Failed to delete file from disk:', err);

            db.run('DELETE FROM files WHERE id = ? AND user_id = ?', [fileId, user.id], function(err) {
                if (err) return res.status(500).json({ success: false, message: 'DB error' });
                res.json({ success: true });
            });
        });
    });
});

module.exports = router;