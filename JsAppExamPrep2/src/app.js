import {render, page} from "../api/lib.js";
import {logout} from "../api/data.js";

import {homePage} from "./views/home.js";
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";
import {detailsPage} from "./views/details.js";
import {createPage} from "./views/create.js";
import {editPage} from "./views/edit.js";
import {myBooksPage} from "./views/myBooks.js";


const root = document.querySelector('main#site-content');
document.querySelector('#logoutBtn').addEventListener('click', onLogout);


page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/create', createPage);
page('/myBooks', myBooksPage);

updateNav();
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    const user = document.querySelector('#user');
    if (userData != null) {
        user.querySelector('span').textContent = `Welcome, ${userData.email}`;
        user.style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        user.style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}

async function onLogout() {
    await logout();
    updateNav();
    page.redirect('/');
}