import {showView} from "./dom.js";
import {showHome} from "./home.js";
import {updateNav} from "./app.js";

const section = document.querySelector('#form-login');
section.querySelector('form').addEventListener('submit',onLogin);
section.remove();

export function showLogin() {
    showView(section);
}

async function onLogin(e) {
    e.preventDefault();

    const loginData = new FormData(e.target);

    const email = loginData.get('email');
    const password = loginData.get('password');

    const res = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password})
    });
    const data = await res.json();
    const userData = {
        email: data.email,
        id: data._id,
        token: data.accessToken
    };
    sessionStorage.setItem('userData',JSON.stringify(userData));

    updateNav();
    showHome();
}
