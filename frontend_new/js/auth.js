document.addEventListener("DOMContentLoaded", async () => {
    // If user is already logged in, redirect to dashboard
    const user = await checkAuth();
    if (user) {
        window.location.href = "dashboard.html";
    }

    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const msgBox = document.getElementById("authMessage");

    function showMessage(msg, isError) {
        msgBox.textContent = msg;
        msgBox.className = `msg-box visible ${isError ? 'error' : ''}`;
    }

    async function handleAuth(action) {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        if (!username || !password) {
            showMessage("PLAYER TAG AND ACCESS CODE REQUIRED", true);
            return;
        }

        try {
            loginBtn.disabled = true;
            signupBtn.disabled = true;

            const res = await apiCall(`/auth/${action}`, "POST", { username, password });
            
            if (res.token) {
                localStorage.setItem(TOKEN_KEY, res.token);
                showMessage("ACCESS GRANTED. INITIALIZING...", false);
                setTimeout(() => window.location.href = "dashboard.html", 1000);
            }
        } catch (error) {
            showMessage(`ACCESS DENIED: ${error.message}`, true);
        } finally {
            loginBtn.disabled = false;
            signupBtn.disabled = false;
        }
    }

    loginBtn.addEventListener("click", () => handleAuth("login"));
    signupBtn.addEventListener("click", () => handleAuth("signup"));
});