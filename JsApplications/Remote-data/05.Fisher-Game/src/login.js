window.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', onLogin);

    async function onLogin(e) {
        e.preventDefault();

        const loginData = new FormData(loginForm);
        const email = loginData.get('email');
        const password = loginData.get('password');

        try {
            const res = await fetch('http://localhost:3030/users/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            if (res.ok != true) {
                const error = await res.json();
                throw new Error(error.message);
            }

            loginForm.reset();
            const data = await res.json();

            const userData = {
                email: data.email,
                id: data._id,
                token: data.accessToken
            };

            sessionStorage.setItem('userData', JSON.stringify(userData));
            window.location = 'myfurniture.html';
        } catch (err) {
            alert(err.message);
        }
    }
});