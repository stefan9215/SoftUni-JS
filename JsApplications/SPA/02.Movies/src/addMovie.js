import {showView} from "./dom.js";
import {showHome} from "./home.js";

const section = document.querySelector('#add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onCreate);
section.remove();

export function showAddMovie() {
    showView(section);
}

async function onCreate(e) {
    e.preventDefault();
    const {token} = JSON.parse(sessionStorage.getItem('userData'));
    const createForm = new FormData(form);

    const title = createForm.get('title');
    const description = createForm.get('description');
    const img = createForm.get('imageUrl');

    const body = {
        title,
        description,
        img
    };

    try {
        if(Object.values(body).some(e => e == '')) {
            throw new Error('All fields are required!');
        };
        const res = await fetch('http://localhost:3030/data/movies',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(body)
        });

        if(res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        form.reset();
        showHome();
    } catch (err) {
        alert(err.message);
    }
}
