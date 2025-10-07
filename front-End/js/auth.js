export function saveAuth(data) {
    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("auth_user", JSON.stringify({
        idUser: data.idUser,
        email: data.email,
        name: data.name,
        referralCode: data.referralCode
    }));
}

export function clearAuth() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
}

export function getToken() { 
    return localStorage.getItem("auth_token");
}

export function getUser() {
    const u = localStorage.getItem("auth_user");
    return u ? JSON.parse(u) : null;
}

export function parseJwt(token) {
    try {
        const payload = token.split(".")[1];
        const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(decodeURIComponent(encodeURI(decoded)));
    } catch (e) { return null; }
}

export function isTokenValid(token = null) {
    const t = token || getToken();
    if (!t) return false;
    const p = parseJwt(t);
    if (!p || !p.exp) return false;
    return (Date.now() / 1000) < p.exp;
}

export async function fetchWithAuth(endpoint, options = {}) {
    const token = getToken();
    options.headers = options.headers || {};
    if (token) options.headers["Authorization"] = `Bearer ${token}`;

    if (options.body && typeof options.body === 'object') {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(options.body);
    }

    const res = await fetch(endpoint, options);
    
    if (res.status === 401) {
        clearAuth();
        window.location.pathname = '/login';
        throw new Error("Unauthorized");
    }
    
    return res;
}

export function getUserFromToken() {
    const t = getToken();
    if (!t) return null;
    const p = parseJwt(t);
    if (!p) return null;
    return { idUser: p.idUser, email: p.sub || p.email, raw: p };
}

export function logout() {
    clearAuth();
    window.location.pathname = "/login";
}