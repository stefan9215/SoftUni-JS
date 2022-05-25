import {html} from "../../api/lib.js";
import {login} from "../../api/data.js";


const loginTemplate = (onLogin) => html`
    <section id="login">
        <div class="container">
            <form @submit="${onLogin}" id="login-form" action="#" method="post">
                <h1>Login</h1>
                <p>Please enter your credentials.</p>
                <hr>

                <p>Username</p>
                <input placeholder="Enter Username" name="username" type="text">

                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn" value="Login">
            </form>
            <div class="signin">
                <p>Dont have an account?
                    <a href="/register">Sign up</a>.
                </p>
            </div>
        </div>
    </section>`;


export async function loginPage(ctx) {
    ctx.render(loginTemplate(onLogin));


    async function onLogin(e) {
        e.preventDefault();

        const loginData = new FormData(e.target);
        const username = loginData.get('username');
        const password = loginData.get('password');

        if (username == '' || password == '') {
            return alert('All fields are required!');
        }

        await login(username, password);
        ctx.updateNav();
        ctx.page.redirect('/catalog');
    }
}