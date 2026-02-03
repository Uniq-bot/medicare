// Check if user is logged in
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || !user.loggedIn) {
        // Not logged in, redirect to login page
        window.location.href = 'login.html';
        return null;
    }
    
    return user;
}

// Display user information
function displayUserInfo() {
    const user = checkAuth();
    
    if (user) {
        document.getElementById('userName').textContent = user.name || 'User';
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('displayEmail').textContent = user.email;
        
        // Format login date
        const loginDate = new Date(user.loginTime);
        const options = { year: 'numeric', month: 'long' };
        document.getElementById('memberSince').textContent = loginDate.toLocaleDateString('en-US', options);
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    displayUserInfo();
    lucide.createIcons();
});
