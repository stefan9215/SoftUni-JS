document.querySelector('#loadBooks').addEventListener('click', getBooks);

const table = document.querySelector('tbody');
table.addEventListener('click', handleButtonClick);
const createForm = document.querySelector('#create-book');
createForm.addEventListener('submit', onSubmit);

const editForm = document.querySelector('#edit-book');
editForm.addEventListener('submit', onEditSubmit);


function handleButtonClick(e) {
    if (e.target.className == 'delete') {
        onDelete(e.target);
    }

    if (e.target.className == 'edit') {
        onEdit(e.target);
    }

}

async function onEditSubmit(e) {
    e.preventDefault();
    const formData = new FormData(editForm);

    const id = formData.get('id');
    const author = formData.get('author');
    const title = formData.get('title');

    await updateBook(id, {author, title})
    e.target.reset();
    createForm.style.display = 'block';
    editForm.style.display = 'none';

    getBooks();
}

async function onEdit(button) {
    createForm.style.display = 'none';
    editForm.style.display = 'block';
    const id = button.parentElement.dataset.id;

    const book = await loadBook(id);

    editForm.querySelector('[name="id"]').value = id;
    editForm.querySelector('[name="title"]').value = book.title;
    editForm.querySelector('[name="author"]').value = book.author;

}

async function loadBook(id) {
    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);

    return book;
}

async function updateBook(id, book) {
    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        body: JSON.stringify(book)
    });
}

async function onDelete(button) {
    const id = button.parentElement.dataset.id;

    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    });
    button.parentElement.parentElement.remove();

}

function onSubmit(e) {
    e.preventDefault();
    createBook();
    getBooks();
}

async function createBook() {
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const formData = new FormData(createForm);

    const author = formData.get('author');
    const title = formData.get('title');

    const book = await request(url, {
        method: 'post',
        body: JSON.stringify({author, title})
    });

    createForm.reset();
}

async function getBooks() {
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const books = await request(url);

    const result = Object.entries(books).map(([id, book]) => createRow(id, book));
    table.replaceChildren(...result);
}

function createRow(id, book) {
    const row = document.createElement('tr');

    row.innerHTML = `<td>${book.title}</td>
<td>${book.author}</td>
<td data-id="${id}">
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
</td>`;

    return row;
}

async function request(url, options) {
    if (options && options.body != undefined) {
        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const res = await fetch(url, options);

    if (res.ok != true) {
        const error = await res.json();
        alert(error.message);
        throw new Error(error.message);
    }

    const data = await res.json();

    return data;
}