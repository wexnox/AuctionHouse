export function redirectBasedOnLogin(pathname) {
    const token = localStorage.getItem('token');
    if (token) {
        if (pathname === "/auth/login.html" || pathname === "/auth/register.html") {
            alert("hey")
            location.href = "/profile";
        }
    } else {
        if (pathname === "/profile/" || pathname === "/profile/index.html") {
            location.href = "/auth/login.html";
        }
    }
}
