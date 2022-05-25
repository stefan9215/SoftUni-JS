function attachEvents() {
    document.querySelector('#btnLoad').addEventListener('click', loadContacts);
    document.querySelector('#btnCreate').addEventListener('click', onCreate);
    phonebook.addEventListener('click', onDelete);
    loadContacts()
}

const phonebook = document.querySelector('#phonebook');
const personInput = document.querySelector('#person');
const phoneInput = document.querySelector('#phone');

attachEvents();


async function onDelete(e) {
    const id = e.target.dataset.id;

    if (id != undefined) {
        await deleteRecord(id);
        e.target.parentElement.remove();
    }
}

async function onCreate() {
    const person = personInput.value;
    const phone = phoneInput.value;

    const contact = {person, phone};
    const result = await createRecord(contact);
    console.log(result);
    phonebook.appendChild(createItem(result));

    personInput.value = '';
    phoneInput.value = '';
}

async function deleteRecord(id) {
    const url = 'http://localhost:3030/jsonstore/phonebook/' + id;

    const res = await fetch(url, {
        method: 'delete'
    });

    const data = await res.json();

    return data;
}


async function createRecord(contact) {
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    });
    const result = await res.json();

    return result;
}

function createItem(contact) {
    const liElement = document.createElement('li');
    liElement.innerHTML = `${contact.person}: ${contact.phone} <button data-id="${contact._id}">Delete</button>`;
    return liElement;
}

async function loadContacts() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const res = await fetch(url);
    const data = await res.json();

    phonebook.replaceChildren(...Object.values(data).map(createItem));
}