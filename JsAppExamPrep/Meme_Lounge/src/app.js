import {page, render} from "../api/lib.js";
import {homePage} from "./views/home.js";
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";
import {allMemesPage} from "./views/allMemes.js";
import {createPage} from "./views/create.js";
import {detailsPage} from "./views/details.js";
import {profilePage} from "./views/profile.js";
import {editPage} from "./views/edit.js";
import {logout} from "../api/data.js";

const root = document.querySelector('main');
document.querySelector('#logoutBtn').addEventListener('click', onLogout);
updateNav();


page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/all-memes', allMemesPage);
page('/create', createPage);
page('/profile', profilePage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {
    const user = JSON.parse(sessionStorage.getItem('userData'));

    if (user != null) {
        document.querySelector('.user span').textContent = `Welcome, ${user.email}`
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

function onLogout() {
    logout();
    updateNav();
}