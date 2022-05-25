import {showView} from "./dom.js";
import {showDetails} from "./details.js";

const section = document.querySelector('#edit-movie');
section.querySelector('form').addEventListener('submit',onEditSubmit);
section.remove();
let currentMovieId = null;
export function showEdit(movieId) {
    currentMovieId = movieId;
    showView(section);
}

async function onEditSubmit(e) {
    e.preventDefault();
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    const editForm = new FormData(e.target);

    const title = editForm.get('title');
    const description = editForm.get('description');
    const img = editForm.get('imageUrl');

    const res = await fetch('http://localhost:3030/data/movies/' + currentMovieId, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': userData.token
        },
        body: JSON.stringify({title, description, img})
    });

    showDetails(currentMovieId);
}