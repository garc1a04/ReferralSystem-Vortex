import { fetchWithAuth, isTokenValid,  getUserFromToken } from './auth.js';
import { API_BASE_URL, URL } from './config.js';

let url_api = `${API_BASE_URL}`;
let url_web = URL();

const alert = document.getElementById('alert');

export async function loadProfileData() {
    const tokenOk = isTokenValid();

    if (!tokenOk) {
        alert.classList.remove("hidden");
        alert.style.backgroundColor = '#ff746C';
        logout();
        return;
    }
    
    const quick = getUserFromToken();

    try {
        const res = await fetchWithAuth(`${url_api}/user/${quick.idUser}`, { method: 'POST' });
        const res2 = await fetchWithAuth(`${url_api}/ref/${quick.idUser}`, { method: 'GET' });

        if (!res.ok || !res2.ok) throw new Error('Erro ao obter dados');

        const serverUser = await res.json();
        const refUser =  await res2.json();
        addInformations(serverUser, refUser);
    } catch (err) {
        console.error(err);
    }
}

function addInformations(serverUser, refUser) {
    document.getElementById('profile-copylink').value = `${url_web}/register?ref=${serverUser.referralCode}`;
    document.getElementById('profile-points').textContent = serverUser.points;
    document.getElementById('profile-name').textContent = serverUser.name;
    
    const tbody = document.getElementById('body_table');
    tbody.innerHTML = "";
    const fragment = document.createDocumentFragment();


    for (const ref of refUser) {
        const tr = document.createElement('tr');
        const dateTd = document.createElement('td');
        dateTd.textContent = formatDate(ref.date);
        const nameTd = document.createElement('td');
        nameTd.textContent = ref.userReferred.name;
        const codeTd = document.createElement('td');
        codeTd.textContent = ref.userReferred.referralCode;

        tr.appendChild(dateTd);
        tr.appendChild(nameTd);
        tr.appendChild(codeTd);
        fragment.appendChild(tr);
    }

    tbody.appendChild(fragment);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}, ${hours}:${minutes}`;
}