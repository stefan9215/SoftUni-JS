import {page, render} from "../api/lib.js";
import {logout} from "../api/data.js";
import {homePage} from "./views/home.js";
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";
import {createPage} from "./views/create.js";
import {catalogPage} from "./views/catalog.js";
import {detailsPage} from "./views/details.js";
import {editPage} from "./views/edit.js";
import {searchPage} from "./views/search2.js";

const root = document.querySelector('#main-content');
document.querySelector('#logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/catalog', catalogPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage);

updateNav();
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

async function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}

function updateNav() {
    const user = JSON.parse(sessionStorage.getItem('userData'));

    if (user) {
        [...document.querySelectorAll('.user')].forEach(e => e.style.display = 'inline-block');
        [...document.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
    } else {
        [...document.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(e => e.style.display = 'inline-block');
    }
}