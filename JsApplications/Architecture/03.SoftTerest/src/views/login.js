import {login} from "../api/data.js";


const section = document.querySelector('#loginPage');
section.remove();
const loginForm = section.querySelector('form');
loginForm.addEventListener('submit', onSubmit);

let ctx = null;

export async function showLoginPage(ctxTarget) {
    ctx = ctxTarget;
    ctx.render(section);
}

async function onSubmit(e) {
    e.preventDefault();
    const loginData = new FormData(loginForm);

    const email = loginData.get('email').trim();
    const password = loginData.get('password').trim();

    await login(email, password);
    loginForm.reset();
    ctx.goTo('home');
    ctx.updateNav();
}