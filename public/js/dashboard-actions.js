// Fetch user info

fetch('/dashboard/me')
    .then(res => res.json())
    .then(user => {
        document.getElementById('username').innerText = user.username;
        document.getElementById('email').innerText = user.email;
        document.getElementById('tel').innerText = user.tel;
    });

// Logout confirmation

const logoutLink = document.getElementById('logout-link');
if (logoutLink) {
    logoutLink.addEventListener('click', function(e) {
        const confirmLogout = confirm("Are you sure you want to log out?");
        if (!confirmLogout) {
            e.preventDefault();
        }
    });
}