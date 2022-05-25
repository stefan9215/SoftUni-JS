import {showHome} from "./home.js";
import {showLogin} from "./login.js";
import {showRegister} from "./register.js";


const views = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister
};
const navigation = document.querySelector('nav');
navigation.addEventListener('click', (ev) => {
    const view = views[ev.target.id];
    if (typeof view == 'function') {
        ev.preventDefault();
        view();
    }
});


let userData = null;

//Logout
navigation.querySelector('#logoutBtn').addEventListener('click', async () => {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData == null) {
        return;
    }
    const res = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': userData.token
        }
    });
    sessionStorage.removeItem('userData');
    updateNav();
    showLogin();
})

export function updateNav() {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        navigation.querySelector('#welcomeMsg').textContent = `Welcome ${userData.email}`;
        [...navigation.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
        [...navigation.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');

    } else {
        [...navigation.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
        [...navigation.querySelectorAll('.user')].forEach(e => e.style.display = 'none');

    }
}

//Starting the app
updateNav();
showHome();