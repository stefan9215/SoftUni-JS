window.addEventListener('load', solve);

function solve() {
    const [genre, name, author, date] = document.querySelectorAll('.container-text form input');
    document.querySelector('#add-btn').addEventListener('click', addHandler);

    const allHits = document.querySelector('.all-hits-container');

    const savedSongs = document.querySelector('.saved-container');

    function addHandler(e) {
        e.preventDefault();

        if(genre.value == '' || name.value == '' || author.value == '' || date.value == '') {
            return;
        }

        const divHit = document.createElement('div');
        divHit.classList.add('hits-info');

        const imgTag = document.createElement('img');
        imgTag.src = './static/img/img.png';

        const h2G = document.createElement('h2');
        h2G.textContent = `Genre: ${genre.value}`;

        const h2N = document.createElement('h2');
        h2N.textContent = `Name: ${name.value}`;

        const h2A = document.createElement('h2');
        h2A.textContent = `Author: ${author.value}`;

        const h3 = document.createElement('h3');
        h3.textContent = `Date: ${date.value}`;

        const saveBtn = document.createElement('button');
        saveBtn.classList.add('save-btn');
        saveBtn.textContent = 'Save song';
        saveBtn.addEventListener('click',saveHandler);

        const likeBtn = document.createElement('button');
        likeBtn.classList.add('like-btn');
        likeBtn.textContent = 'Like song';

        likeBtn.addEventListener('click', likeHandler);

        const delBtn = document.createElement('button');
        delBtn.classList.add('delete-btn');
        delBtn.textContent = 'Delete';

        delBtn.addEventListener('click', deleteHandler)

        divHit.appendChild(imgTag);
        divHit.appendChild(h2G);
        divHit.appendChild(h2N);
        divHit.appendChild(h2A);
        divHit.appendChild(h3);
        divHit.appendChild(saveBtn);
        divHit.appendChild(likeBtn);
        divHit.appendChild(delBtn);

        allHits.appendChild(divHit);

        //TODO clear input fields

        genre.value = '';
        name.value = '';
        author.value = '';
        date.value = '';

    }

    function saveHandler(e) {
        let wholeDiv = e.target.parentElement;

        wholeDiv.querySelector('.save-btn').remove();
        wholeDiv.querySelector('.like-btn').remove();

        savedSongs.appendChild(wholeDiv);


    }

    function likeHandler(e){
        const likesField = document.querySelector('.likes p');
        let likes = Number(likesField.textContent.slice(-1));
        likes++;

        likesField.textContent = `Total Likes: ${likes}`;

        e.target.disabled = true;
    }

    function deleteHandler(e) {
        e.target.parentElement.remove();
    }
}
