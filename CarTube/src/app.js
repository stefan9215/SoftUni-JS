import {page, render} from "../api/lib.js";
import {homePage} from "./views/home.js";
import {catalogPage} from "./views/catalog.js";
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";
import {logout} from "../api/data.js";
import {createPage} from "./views/create.js";
import {detailsPage} from "./views/details.js";
import {editPage} from "./views/edit.js";
import {myCarsPage} from "./views/myCars.js";
import {searchPage} from "./views/search.js";

const root = document.querySelector('#site-content');
document.querySelector('#logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-listings', myCarsPage);
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
        document.querySelector('#profile a').textContent = `Welcome ${user.username}`;
        document.querySelector('#profile').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#profile').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}