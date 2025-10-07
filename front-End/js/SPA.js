import { loadProfileData } from './profile.js';
import { saveAuth, isTokenValid, getToken, logout} from './auth.js';
import { showAlert } from './UI.js';

let url = "http://localhost:8080/user";

const routes = {
    '/': 'login',
    '/login': 'login',
    '/register': 'register',
    '/profile': 'profile',
    '/logout': 'logout',
    '/404': 'not-found' 
};

const allPages = document.querySelectorAll('.page');

export function showPage(pageId) {
    if (pageId === "logout") {
        logout();
        return;
    }

    const token = getToken();
    const tokenValid = token && isTokenValid(token);

    if (pageId === "profile" && !tokenValid) {
        window.history.replaceState(null, null, "/login");
        pageId = "login";
    }

    if (pageId === "register" && tokenValid) {
        window.history.replaceState(null, null, "/profile");
        pageId = "profile";
    }

    allPages.forEach(p => p.classList.remove('active'));
    const pageToShow = document.getElementById(pageId);

    if (pageToShow) {
        pageToShow.classList.add('active');
        if (pageId === "profile" && tokenValid) {
            loadProfileData();
        }
    } else {
        window.history.replaceState(null, null, "/404");
        document.getElementById("not-found")?.classList.add('active');
    }
}

function handleLocation() {
    const token = getToken();
    const tokenValid = token && isTokenValid(token);

    let path = window.location.pathname; 
    let pageId = routes[path] || routes['/404'];

    if (pageId === "profile" && !tokenValid) {
        showAlert("Timeout, please log in", '#ff746C');
        path = "/login";
        pageId = routes["/login"];
        window.history.replaceState(null, null, path);
    }

    if ((pageId === "login" || pageId === "register") && tokenValid) {
        path = "/profile";
        pageId = routes["/profile"];
        window.history.replaceState(null, null, path);
    }

    showPage(pageId);
}

handleLocation();
window.addEventListener('popstate', handleLocation);
document.addEventListener('DOMContentLoaded', handleLocation);
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header_profile");
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
