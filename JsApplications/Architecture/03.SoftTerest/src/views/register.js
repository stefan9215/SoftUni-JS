import {register} from "../api/data.js";


const section = document.querySelector('#registerPage');
section.remove();

const registerForm = section.querySelector('form');
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const registerData = new FormData(registerForm);

    const email = registerData.get('email');
    const password = registerData.get('password');
    const rePass = registerData.get('repeatPassword');

    if (email.length < 4) {
        return alert('E-mail must be at least 4 characters long!');
    }

    if (password.length < 4) {
        return alert('Password must be at least 4 characters long!');
    }

    if(password != rePass) {
        return alert('Password dont match!');
    }

    await register(email, password);
    registerForm.reset();
    ctx.goTo('home');
    ctx.updateNav();
});

let ctx = null;
export async function showRegisterPage(ctxTarget) {
    ctx = ctxTarget;
    ctx.render(section);
}