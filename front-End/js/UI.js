export function showAlert(message, bgColor, duration = 2000) {
    const alert = document.getElementById('alert');

    alert.textContent = message;
    alert.style.backgroundColor = bgColor;
    alert.classList.remove("hidden", "fade-out");
    alert.classList.add("fade-in");

    setTimeout(() => {
        alert.classList.remove("fade-in");
        alert.classList.add("fade-out");
        
        setTimeout(() => {
            alert.classList.add("hidden");
        }, 400);
    }, duration);
}

export function showError(message, formIndex) {
    const err = document.querySelector(`.Err${formIndex}`);
    if (err) {
        err.textContent = message;
        err.classList.remove("hidden");
    }
}

export function clearError(formIndex) {
    const err = document.querySelector(`.Err${formIndex}`);
    if (err) {
        err.classList.add("hidden");
    }
}

export function handleCopyButton() {
    const copyButton = document.getElementById("copy");
    const linkInput = document.getElementById('profile-copylink');

    copyButton.textContent = "Copied";
    copyButton.classList.add("copied-btn");
    navigator.clipboard.writeText(linkInput.value);

    setTimeout(() => {
        copyButton.textContent = "Copy";
        copyButton.classList.remove("copied-btn");
    }, 2000);
}