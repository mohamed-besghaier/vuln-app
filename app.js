// app.js

const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/register.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/admin.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/dashboard.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/profile.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/upload.html'));
});

app.use((req, res) => {
  res.status(404).send('<h1> 404 - Page Not Found </h1>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});