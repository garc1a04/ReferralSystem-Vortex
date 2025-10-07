import { API_BASE_URL } from './config.js';

async function handleResponse(response) {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Unknown server error");
    }

    const text = await response.text();
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}

export async function loginUser(email, password) {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    return handleResponse(response);
}

export async function registerUser(name, email, password, referralCode) {
    const endpoint = referralCode 
        ? `${API_BASE_URL}/user/register?ref=${encodeURIComponent(referralCode)}`
        : `${API_BASE_URL}/user/register`;
    
    const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    return handleResponse(response);
}