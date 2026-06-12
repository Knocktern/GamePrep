const TOKEN_KEY = "gameprep_token_new";
const API_BASE_KEY = "gameprep_api_base";

function resolveApiBase() {
  const params = new URLSearchParams(window.location.search);
  const apiOverride = params.get("api");
  if (apiOverride) {
    const normalized = normalizeApiBase(apiOverride);
    localStorage.setItem(API_BASE_KEY, normalized);
    return normalized;
  }

  const storedOverride = localStorage.getItem(API_BASE_KEY);
  if (storedOverride) {
    return normalizeApiBase(storedOverride);
  }

  if (window.location.protocol === "file:") {
    return "http://localhost:8080/api";
  }

  if (window.location.hostname.includes("5500")) {
    return `${window.location.protocol}//${window.location.hostname.replace("5500", "8080")}/api`;
  }

  return `${window.location.protocol}//${window.location.hostname}:8080/api`;
}

function normalizeApiBase(value) {
  const trimmed = String(value || "").trim().replace(/\/+$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
}

const API_BASE = resolveApiBase();

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

  let response;
  try {
    response = await fetch(`${API_BASE}${endpoint}`, options);
  } catch (error) {
    throw new Error(`Cannot reach backend at ${API_BASE}. If you are using port forwarding, forward backend port 8080 too, then open this page with ?api=<forwarded-8080-url>.`);
  }
  
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
