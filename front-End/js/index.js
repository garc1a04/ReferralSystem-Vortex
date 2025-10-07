import { saveAuth } from './auth.js';
import { showPage } from './SPA.js';
import { loginUser, registerUser } from './API.js';
import { showError, clearError, showAlert, handleCopyButton } from './UI.js';

const loginForm = document.getElementById('login_form');
const registerForm = document.getElementById('register_form');
const copyButton = document.getElementById("copy");
const btns = document.querySelectorAll('.toggle');

async function handleLogin(event) {
    event.preventDefault();
    clearError(1);
    
    const email = loginForm.elements.email.value.trim();
    const password = loginForm.elements.password.value.trim();
    
    if (!email || !password) {
        showError("Email and password are required!", 1);
        return;
    }

    try {
        const data = await loginUser(email, password);
        saveAuth(data);
        window.history.pushState(null, null, '/profile');
        showPage('profile');
    } catch (err) {
        showError(err.message, 1);
    }
}

async function handleRegister(event) {
    event.preventDefault();
    clearError(2);

    const name = registerForm.elements.name.value.trim();
    const email = registerForm.elements.email_register.value.trim();
	const password = registerForm.elements.password_register.value.trim();
	const confirm_password = registerForm.elements.password_confirm.value.trim();
    
    const error = validateRegisterForm(name, email, password, confirm_password);
    if (error) {
        showError(error, 2);
        return;
    }

    try {
        const params = new URLSearchParams(window.location.search);
        const referralCode = params.get("ref");
        await registerUser(name, email, password, referralCode);
        showAlert("Registration completed successfully!", '#63783D');
        window.history.pushState(null, null, '/login');
        showPage('login');
    } catch (err) {
        showError(err.message, 2);
    }
}

function validateRegisterForm(name, email, password, confirm_password) {
    if (!name || !email || !password || !confirm_password)
        return "All fields are required!";

    if (name.length > 30)
        return "Name must not exceed 30 characters.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
        return "Please enter a valid email address.";

    if (password !== confirm_password)
        return "Passwords do not match.";

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password))
        return "Password must have at least 8 characters, including letters and numbers.";

    return null;
}

function input_toggle(event){
    let id = this.id.split("__")[1];
    let span = document.querySelector(`.${this.id}`);
    let input = document.getElementById(id);

    span.textContent = span.textContent === "visibility_off" ? "visibility" : "visibility_off" 
    input.type = input.type === "password" ? "text" : "password" 
}

loginForm.addEventListener("submit", handleLogin);
registerForm.addEventListener("submit", handleRegister);
copyButton.addEventListener("click", handleCopyButton);
btns.forEach(btn => {btn.addEventListener("click",input_toggle);})