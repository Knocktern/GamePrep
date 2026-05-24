const API_BASE = "http://localhost:8080/api";
const TOKEN_KEY = "gameprep_token_new";

function getAuthHeaders() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  }
  return {
    "Content-Type": "application/json"
  };
}

async function apiCall(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: getAuthHeaders()
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, options);
  
  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = data?.message || `Error ${response.status}: Request failed`;
    if (response.status === 401 || errorMsg.toLowerCase().includes("token")) {
        // Token expired or invalid
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = "index.html";
    }
    throw new Error(errorMsg);
  }

  return data;
}

async function checkAuth() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  try {
    const user = await apiCall("/auth/me");
    return user;
  } catch (error) {
    console.error("Auth check failed:", error);
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
}

function logout() {
  apiCall("/auth/logout", "POST").catch(() => {});
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "index.html";
}
