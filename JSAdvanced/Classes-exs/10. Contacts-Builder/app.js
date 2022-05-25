class Contact {
    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this._online = false;
    }

    get online() {
        return this._online;
    }

    set online(value) {
        if (this.divTitle) {
            if (!value) {
                this.divTitle.classList.remove('online');
            } else {
                this.divTitle.classList.add('online');
            }
        }

        this._online = value;
    }

    render(id) {
        const main = document.getElementById(id);
        const article = document.createElement('article');
        this.divTitle = document.createElement('div');
        this.divTitle.classList.add('title');
        this.divTitle.textContent = `${this.firstName} ${this.lastName}`;

        if (this._online) {
            this.divTitle.classList.add('online');
        }
        const btn = document.createElement('button');
        btn.innerHTML = '\u2139';
        btn.addEventListener('click', () => {
            divInfo.style.display =
                divInfo.style.display == 'none' ? 'block' : 'none';
        });

        this.divTitle.appendChild(btn);

        const divInfo = document.createElement('div');
        divInfo.classList.add('info');
        divInfo.style.display = 'none';

        const phoneSpan = document.createElement('span');
        phoneSpan.innerText = `\u260E ${this.phone}`;
        const emailSpan = document.createElement('span');
        emailSpan.textContent = `\u2709 ${this.email}`;
        divInfo.appendChild(phoneSpan);
        divInfo.appendChild(emailSpan);


        article.appendChild(this.divTitle);
        article.appendChild(divInfo);
        main.appendChild(article);
    }

}

let contacts = [
    new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
    new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
    new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
];
contacts.forEach(c => c.render('main'));

// After 1 second, change the online status to true
setTimeout(() => contacts[1].online = true, 2000);
setTimeout(() => contacts[2].online = true, 5000);
setTimeout(() => contacts[0].online = true, 0);
setTimeout(() => contacts[0].online = false, 5000);
