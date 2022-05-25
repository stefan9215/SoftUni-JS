async function lockedProfile() {
    const main = document.querySelector('#main');
    main.addEventListener('click', onClick);

    const res = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const data = await res.json();

    Object.values(data).forEach(p => {
        createProfile(p);
    });

    function createProfile(person) {
        const profile = document.createElement('div');
        profile.classList.add('profile');

        let name = person.username;
        let email = person.email;
        let age = person.age;

        profile.innerHTML = `<img src=\"./iconProfile2.png\" class=\"userIcon\" />
<label>Lock</label>
<input type=\"radio\" name=\"user1Locked\" value="lock" checked>
<label>Unlock</label>
<input type=\"radio\" name=\"user1Locked\" value="unlock"><br>
<hr>
<label>Username</label>
<input type=\"text\" name=\"user1Username\" value=${name} disabled readonly />
<div class=\"hiddenInfo\">
<hr>
<label>Email:</label>
<input type=\"email\" name=\"user1Email\" value=${email} disabled readonly />
<label>Age:</label>
<input type=\"email\" name=\"user1Age\" value=${age} disabled readonly />
</div>
<button>Show more</button>`
        main.appendChild(profile);
    }

    function onClick(e) {
        if (e.target.tagName == 'BUTTON') {
            let user = e.target.parentElement;
            let hiddenField = e.target.previousElementSibling;
            let checkUnlock = user.querySelector('input[type="radio"][value="unlock"]');
            if (checkUnlock.checked) {
                e.target.textContent = e.target.textContent == 'Show more'
                    ? 'Hide it'
                    : 'Show more'

                hiddenField.lastElementChild.style.display = hiddenField.lastElementChild.style.display == 'block'
                    ? Array.from(hiddenField.children).forEach(c => c.style.display = 'none')
                    : Array.from(hiddenField.children).forEach(c => c.style.display = 'block')
            }
        }
    }
}