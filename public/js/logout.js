const logoutLink = document.getElementById('logout-link');
if (logoutLink) {
    logoutLink.addEventListener('click', function(e) {
        const confirmLogout = confirm("Are you sure you want to log out?");
        if (!confirmLogout) {
            e.preventDefault();
        }
    });
}