import {showView} from "./dom.js";
import {updateNav} from "./app.js";
import {showHome} from "./home.js";

const section = document.querySelector('#form-sign-up');
section.querySelector('form').addEventListener('submit', onRegister);
section.remove();

export function showRegister() {
    showView(section);
}

async function onRegister(e) {
    e.preventDefault();

    const registerForm = new FormData(e.target);
    const email = registerForm.get('email');
    const password = registerForm.get('password');
    const rePass = registerForm.get('repeatPassword');

    try {
        if(password != rePass) {
            throw new Error('Password dont match');
        }
        const res = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        if(res.ok != true) {
            const error = await res.json();
            throw new Error(error.message)
        }

        const data = await res.json();

        sessionStorage.setItem('userData',JSON.stringify({
            email: data.email,
            id: data._id,
            token: data.accessToken
        }));
        updateNav();
        showHome();
    }catch (err) {
        alert(err.message)
    }
}
