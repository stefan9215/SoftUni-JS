function attachEvents() {
    document.querySelector('#submit').addEventListener('click', postMessage);
    document.querySelector('#refresh').addEventListener('click', getAllMessages);
}

attachEvents();

async function getAllMessages() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const textarea = document.querySelector('#messages');

    const res = await fetch(url);
    const data = await res.json();

    const messages = Object.values(data)
        .map(m => `${m.author}: ${m.content}`)
        .join('\n');

    textarea.textContent = messages;
}

async function postMessage() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const author = document.querySelector('[name="author"]').value;
    const contentInput = document.querySelector('[name="content"]');
    const content = contentInput.value;

    const data = {
        author,
        content
    };

    const options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }
    const res = await fetch(url, options);

    contentInput.value = '';
}