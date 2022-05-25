import {e, showView} from "./dom.js";
import {showAddMovie} from "./addMovie.js";
import {showDetails} from "./details.js";

const section = document.querySelector('#home-page');
const catalog = section.querySelector('.card-deck.d-flex.justify-content-center');
section.querySelector('#add-movie-button').addEventListener('click', (e) => {
    e.preventDefault();
    showAddMovie();
});

catalog.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.target;

    if (target.tagName == 'BUTTON') {
        target = target.parentElement;
    }

    if (target.tagName == 'A') {
        const currentId = target.dataset.id;
        showDetails(currentId);
    }
});
section.remove();

export function showHome() {
    showView(section);
    loadHome();
}

async function loadHome() {
    const res = await fetch('http://localhost:3030/data/movies');

    const data = await res.json();

    catalog.replaceChildren(...data.map(createMovieCard));
}


function createMovieCard(movie) {
    const div = e('div', {className: 'card mb-4'});
    div.innerHTML = `
<img class="card-img-top" src="${movie.img}"
         alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a data-id="${movie._id}" href="#/details/6lOxMFSMkML09wux6sAF">
            <button type="button" class="btn btn-info">Details</button>
        </a>
</div>`

    return div;
}
