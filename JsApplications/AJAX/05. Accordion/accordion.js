async function solution() {

    const res = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    const data = await res.json();

    Object.values(data).forEach(e => createDiv(e));

    async function createDiv(accordion) {
        const section = document.querySelector('#main');
        let id = accordion._id;
        const div = document.createElement('div');
        div.classList.add('accordion');

        const res = await fetch('http://localhost:3030/jsonstore/advanced/articles/details/' + accordion._id);
        const result = await res.json();


        div.innerHTML = `<div class="head">
                <span>${accordion.title}</span>
                <button class="button" id=${id}>More</button>
            </div>
            <div class="extra">
                <p>${result.content}</p>
            </div>`;

        section.appendChild(div);

        section.addEventListener('click', onClick);
    }

    function onClick(e) {
        if (e.target.tagName != 'BUTTON') {
            return;
        }

        e.target.textContent = e.target.textContent == 'More' ? 'Less' : 'More';

        e.target.parentElement.parentElement.lastElementChild.style.display =
            e.target.parentElement.parentElement.lastElementChild.style.display == 'block'
                ? 'none'
                : 'block'
    }
}

solution();