const API_BASE = "http://localhost:8080/api";
const TOKEN_KEY = "gameprep_token";

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const authMessage = document.getElementById("authMessage");

function showMessage(message, isError = false) {
  if (!authMessage) {
    return;
  }
  authMessage.textContent = message;
  authMessage.classList.toggle("error", isError);
  authMessage.classList.add("visible");

  setTimeout(() => {
    authMessage.classList.remove("visible");
    authMessage.classList.remove("error");
  }, 2000);
}

async function readErrorMessage(response, fallback) {
  const contentType = response.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      const data = await response.json();
      if (data && data.message) {
        return data.message;
      }
      return JSON.stringify(data);
    }
    const text = await response.text();
    return text || fallback;
  } catch (error) {
    return fallback;
  }
}

async function handleAuth(endpoint, payload) {
  try {
    const response = await fetch(`${API_BASE}/auth/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const message = await readErrorMessage(response, `Request failed: ${response.status}`);
      throw new Error(message);
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
    showMessage(data.message || "Success");
    window.location.href = "index.html";
  } catch (error) {
    console.error(error);
    showMessage(error.message || "Request failed", true);
  }
}

function redirectIfLoggedIn() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    window.location.href = "index.html";
  }
}

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    if (!username || !password) {
      showMessage("Username and password required.", true);
      return;
    }
    handleAuth("login", { username, password });
  });
}

if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    if (!username || !password) {
      showMessage("Username and password required.", true);
      return;
    }
    handleAuth("signup", { username, password });
  });
}

window.addEventListener("DOMContentLoaded", redirectIfLoggedIn);
