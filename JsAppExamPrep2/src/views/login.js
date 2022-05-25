import {html} from "../../api/lib.js";
import {login} from "../../api/data.js";

const loginTemplate = (onSubmit) => html`
    <section id="login-page" class="login">
        <form @submit="${onSubmit}" id="login-form" action="" method="">
            <fieldset>
                <legend>Login Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                </p>
                <input class="button submit" type="submit" value="Login">
            </fieldset>
        </form>
    </section>`;

export async function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const loginData = new FormData(e.target);
        const email = loginData.get('email');
        const password = loginData.get('password');

        await login(email, password);
        ctx.updateNav();
        ctx.page.redirect('/');
    }
}