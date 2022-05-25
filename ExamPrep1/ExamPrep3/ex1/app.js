function solve() {
    const [creator, title, category] = document.querySelectorAll('section form input');
    const content = document.querySelector('#content');
    document.querySelector('form .btn').addEventListener('click', newPostHandler);

    const main = document.querySelector('.site-content main section');

    const archiveSection = document.querySelector('.archive-section ol');

    function newPostHandler(e) {
        e.preventDefault();

        const article = document.createElement('article');
        const h1 = document.createElement('h1');
        h1.textContent = title.value;

        const pTag = document.createElement('p');
        pTag.textContent = 'Category:';

        const strong = document.createElement('strong');
        strong.textContent = category.value;

        pTag.appendChild(strong);

        const creatorParagr = document.createElement('p');
        creatorParagr.textContent = 'Creator:';

        const creatorStrong = document.createElement('strong');
        creatorStrong.textContent = creator.value;
        creatorParagr.appendChild(creatorStrong);

        const contentP = document.createElement('p');
        contentP.textContent = content.value;

        const btnDiv = document.createElement('div');
        btnDiv.classList.add('buttons');

        const delBtn = document.createElement('button');
        delBtn.classList.add('btn');
        delBtn.classList.add('delete');
        delBtn.textContent = 'Delete';

        delBtn.addEventListener('click', deletePost);

        const archiveBtn = document.createElement('button');
        archiveBtn.classList.add('btn');
        archiveBtn.classList.add('archive');
        archiveBtn.textContent = 'Archive';

        archiveBtn.addEventListener('click',() => archivePost(h1));

        btnDiv.appendChild(delBtn);
        btnDiv.appendChild(archiveBtn);

        article.appendChild(h1);
        article.appendChild(pTag);
        article.appendChild(creatorParagr);
        article.appendChild(contentP);
        article.appendChild(btnDiv);

        main.appendChild(article);
    }

    function deletePost(e) {
        e.target.parentElement.parentElement.remove();
    }

    function archivePost(title) {
        const li = document.createElement('li');
        li.textContent = title.textContent;
        archiveSection.appendChild(li);
        sort();
        title.parentElement.remove();

    }

    function sort() {
        Array.from(archiveSection.children)
            .sort((a,b) => a.textContent.localeCompare(b.textContent))
            .forEach((li) => archiveSection.appendChild(li));
    }
}
