import {cancelForm, onSubmitPost} from "./home.js";

document.querySelector('nav').addEventListener('click', () => {
    window.location = 'myfurniture.html';
});

const views = {
    'public': onSubmitPost,
    'cancel': cancelForm
};

document.querySelector('.new-topic-buttons').addEventListener('click', (e) => {
    e.preventDefault();
    const view = views[e.target.className];

    if(typeof view == 'function') {
        view();
    }
})
