import {html} from "../../api/lib.js";
import {register} from "../../api/data.js";


const registerTemplate = (onRegister) => html`
    <section id="register">
        <div class="container">
            <form @submit="${onRegister}" id="register-form">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>

                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>

                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>

                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>

                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>`;


export async function registerPage(ctx) {
    ctx.render(registerTemplate(onRegister));


    async function onRegister(e) {
        e.preventDefault();

        const registerData = new FormData(e.target);
        const username = registerData.get('username');
        const password = registerData.get('password');
        const repeatPass = registerData.get('repeatPass');

        if (username == '' || password == '' || repeatPass == '') {
            return alert('All fields are required!');
        }

        if (password != repeatPass) {
            return alert('Passwords dont match!');
        }

        await register(username, password);
        ctx.updateNav();
        ctx.page.redirect('/catalog');
    }
}