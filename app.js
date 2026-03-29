// app.js

const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'mysecret123',
  resave: false,
  saveUninitialized: false
}));

app.use(authRoutes);
app.use('/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'register.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'admin.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'profile.html'));
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'upload.html'));
});

app.use((req, res) => {
  res.status(404).send('<h1> 404 - Page Not Found </h1>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
        Server is running on port ${PORT}
        Click : http://localhost:3000/
        `);
});
