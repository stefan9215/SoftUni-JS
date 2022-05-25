import {showHomePage} from './views/home.js';
import {showCatalogPage} from "./views/catalog.js";
import {showRegisterPage} from "./views/register.js";
import {showLoginPage} from "./views/login.js";
import {showCreatePage} from "./views/create.js";
import {showDetailsPage} from "./views/details.js";
import {render} from "./api/util.js";
import {logout} from "./api/data.js";


const links = {
    'homeLink': 'home',
    'catalogLink': 'catalog',
    'getStartedBtn': 'catalog',
    'registerLink': 'register',
    'loginLink': 'login',
    'createLink': 'create'
};

const views = {
    'home': showHomePage,
    'catalog': showCatalogPage,
    'register': showRegisterPage,
    'login': showLoginPage,
    'create': showCreatePage,
    'details': showDetailsPage
};

const ctx = {
    goTo,
    render,
    updateNav
}

const nav = document.querySelector('nav');
nav.addEventListener('click', (e) => {
    const link = links[e.target.id];
    if (link) {
        e.preventDefault();
        goTo(link);
    }
});

//Logout
document.querySelector('#logoutBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    await logout();
    updateNav();
    goTo('login');
});

//Start app
goTo('home');

function goTo(link, ...params) {
    const view = views[link];

    if (typeof view == 'function') {
        view(ctx, ...params);
    }
}

function updateNav() {
    const userData = sessionStorage.getItem('userData');

    if(userData != null) {
        [...nav.querySelectorAll('.user')].forEach(i => i.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(i => i.style.display = 'none');
    } else {
        [...nav.querySelectorAll('.user')].forEach(i => i.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(i => i.style.display = 'block');
    }
}