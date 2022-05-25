const form = document.querySelector('form');
form.addEventListener('submit', onSubmitPost);

export function cancelForm() {
    form.reset();
}

export async function onSubmitPost() {
    // ev.preventDefault();
    const formData = new FormData(form);

    const topicName = formData.get('topicName');
    const username = formData.get('username');
    const postText = formData.get('postText');

    const post = {
        topicName,
        username,
        postText
    };
    try {
        if(Object.values(post).some(p => p == '')) {
            throw new Error('All fields are required!');
        }
        const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });

        if(res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        };

        const data = await res.json();

        document.querySelector('.topic-container')
            .replaceChildren(...data.map(createPost));
    }catch (err) {
        alert(err.message);
    }
}

function createPost(post) {
    const element = document.createElement('div');
    console.log(post)
    element.classList.add('topic-name-wrapper');
    element.innerHTML =
`<div class="topic-name">
    <a href="#" class="normal">
        <h2>${post.topicName}</h2>
    </a>
    <div class="columns">
        <div>
            <p>Date: <time>2020-10-10T12:08:28.451Z</time></p>
            <div class="nick-name">
                <p>Username: <span>${post.username}</span></p>
            </div>
        </div>
    </div>
</div>`

    return element;
}