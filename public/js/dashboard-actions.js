// Fetch user info

fetch('/dashboard/me')
    .then(res => res.json())
    .then(user => {
        document.getElementById('username').innerText = user.username;
        document.getElementById('email').innerText = user.email;
        document.getElementById('tel').innerText = user.tel;
    });