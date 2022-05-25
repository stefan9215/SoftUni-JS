import {html} from "../../api/lib.js";
import {register} from "../../api/data.js";


const registerTemplate = (onRegister) => html`
    <section id="registerPage">
        <form @submit="${onRegister}">
            <fieldset>
                <legend>Register</legend>

                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">

                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                <button type="submit" class="register">Register</button>

                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>`;


export async function registerPage(ctx) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(e) {
        e.preventDefault();
        const registerData = new FormData(e.target);
        const email = registerData.get('email');
        const password = registerData.get('password');
        const repass = registerData.get('conf-pass');

        if (email == '' || password == '' || repass == '') {
            return alert('All fields are required!');
        }

        if(password != repass) {
            return alert('Passwords dont match!');
        }

        await register(email, password);
        ctx.updateNav();
        ctx.page.redirect('/');
    }
}