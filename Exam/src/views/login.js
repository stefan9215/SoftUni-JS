import {html} from "../../api/lib.js";
import {login} from "../../api/data.js";


const loginTemplate = (onLogin) => html`
    <section id="loginPage">
        <form @submit="${onLogin}">
            <fieldset>
                <legend>Login</legend>

                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">

                <button type="submit" class="login">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>`;


export async function loginPage(ctx) {
    ctx.render(loginTemplate(onLogin));

    async function onLogin(e) {
        e.preventDefault();
        const loginData = new FormData(e.target);
        const email = loginData.get('email');
        const password = loginData.get('password');

        if (email == '' || password == '') {
            return alert('All fields are required!');
        }

        await login(email, password);
        ctx.updateNav();
        ctx.page.redirect('/');
    }
}