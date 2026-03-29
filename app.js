const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const uploadRoutes = require('./routes/upload');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'mysecret123',
  resave: false,
  saveUninitialized: false
}));

// Middleware to check login
function isLoggedIn(req, res, next) {
    if (req.session.user) return next();
    res.redirect('/');
}

app.use(authRoutes);
app.use('/dashboard', isLoggedIn, dashboardRoutes);
app.use('/upload', isLoggedIn, uploadRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'register.html'));
});

app.get('/admin', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'admin.html'));
});

app.get('/profile', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'profile.html'));
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send('Error logging out');
        res.redirect('/');
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}\nClick: http://localhost:${PORT}/`);
});