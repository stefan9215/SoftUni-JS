function attachEvents() {
    document.querySelector('#btnLoadPosts').addEventListener('click', getAllPosts);
    document.querySelector('#btnViewPost').addEventListener('click', viewHandler);
}

attachEvents();

async function viewHandler() {
    const title = document.querySelector('#post-title');
    const bodyElement = document.querySelector('#post-body');
    const ulComments = document.querySelector('#post-comments');
    title.textContent = 'Зареждам';
    bodyElement.textContent = '';
    ulComments.replaceChildren();

    const selectedId = document.querySelector('#posts').value;


    const [post, comments] = await Promise.all([
        getPostById(selectedId),
        getCommentsById(selectedId)
    ]);
    title.textContent = post.title;
    bodyElement.textContent = post.body;

    Object.values(comments).forEach(e => {
        const liElement = document.createElement('li');
        liElement.textContent = e.text;
        ulComments.appendChild(liElement);
    })
}

async function getAllPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts';

    const res = await fetch(url);
    const data = await res.json();

    const selectElement = document.querySelector('#posts');
    selectElement.replaceChildren();

    Object.values(data).forEach(e => {
        const optionElement = document.createElement('option');
        optionElement.textContent = e.title;
        optionElement.value = e.id;
        selectElement.appendChild(optionElement);
    })
}

async function getPostById(postId) {
    const url = 'http://localhost:3030/jsonstore/blog/posts/' + postId;

    const res = await fetch(url);
    const data = await res.json();

    return data;
}

async function getCommentsById(postId) {
    const url = 'http://localhost:3030/jsonstore/blog/comments';

    const res = await fetch(url);
    const data = await res.json();

    const comments =  Object.values(data).filter(c => c.postId == postId);
    return comments;
}