import {e, showView} from "./dom.js";
import {showHome} from "./home.js";
import {showEdit} from "./edit.js";


let currentMovieId = null;
const section = document.querySelector('#movie-example');
section.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.className == 'btn btn-danger') {
        deleteMovie(currentMovieId);
        showHome()
    } else if (e.target.className == 'btn btn-warning') {
        showEdit(currentMovieId);
    }
})
section.remove();

export function showDetails(movieId) {
    currentMovieId = movieId
    showView(section);
    showMovieDetails(movieId);
}

async function deleteMovie(id) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    await fetch('http://localhost:3030/data/movies/' + id, {
        method: 'delete',
        headers: {
            'X-Authorization': userData.token
        }
    });
}

async function showMovieDetails(id) {

    const requests = [
        fetch('http://localhost:3030/data/movies/' + id),
        fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
    ];
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData != null) {
        requests.push(fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userData.id}%22`));
    }
    ;

    const [movieRes, likesRes, hasLikedRes] = await Promise.all(requests);

    const [movieData, likes, hasLiked] = await Promise.all([
        movieRes.json(),
        likesRes.json(),
        hasLikedRes && hasLikedRes.json()
    ]);

    section.replaceChildren(createDetailsPage(movieData, likes, hasLiked));
}

function createDetailsPage(movie, likes, hasLiked) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const isOwner = userData.id == movie._ownerId;

    const controls = e('div', {className: 'col-md-4 text-center'},
        e('h3', {className: 'my-3'}, 'Movie Description'),
        e('p', {}, movie.description))

    if (isOwner) {
        controls.appendChild(e('a', {className: 'btn btn-danger', href: '#'}, 'Delete'));
        controls.appendChild(e('a', {className: 'btn btn-warning', href: '#'}, 'Edit'));
    } else {
        if (hasLiked.length > 0) {
            controls.appendChild(e('a', {className: 'btn btn-primary', href: '#', onClick: onUnlike}, 'Unlike'));
        } else {
            controls.appendChild(e('a', {className: 'btn btn-primary', href: '#', onClick: onLike}, 'Like'));
        }
    }
    controls.appendChild(e('span', {className: 'enrolled-span'}, `Liked ${likes}`));

    const element = e('div', {className: 'container'},
        e('div', {className: 'row bg-light text-dark'},
            e('h1', {}, `Movie title: ${movie.title}`),
            e('div', {className: 'col-md-8'},
                e('img', {className: 'img-thumbnail', src: movie.img, alt: 'Movie'}))
            , controls));

    return element;

    async function onLike() {
        await fetch('http://localhost:3030/data/likes', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify({movieId: movie._id})
        });

        showDetails(movie._id);
    }

    async function onUnlike() {
        const likeId = hasLiked[0]._id;
        await fetch('http://localhost:3030/data/likes/' + likeId, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json',
                'X-Authorization': userData.token
            }
        });

        showDetails(movie._id);
    }
}


