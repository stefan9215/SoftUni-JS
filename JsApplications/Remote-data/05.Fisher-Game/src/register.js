window.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('form');

    registerForm.addEventListener('submit', onRegister);

    async function onRegister(e) {
        e.preventDefault();

        const loginData = new FormData(registerForm);
        const email = loginData.get('email');
        const password = loginData.get('password');
        const rePass = loginData.get('rePass');

        try {
            if (password != rePass) {
                throw new Error('Passwords dont match');
            }
            const res = await fetch('http://localhost:3030/users/register', {
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

            registerForm.reset();
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