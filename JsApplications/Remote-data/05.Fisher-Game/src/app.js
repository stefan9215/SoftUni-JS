let userData = null;
window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    loadCatches()
    if (userData != null) {
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('span').textContent = userData.email;
        document.querySelector('#addForm .add').disabled = false;
    } else {
        document.querySelector('#user').style.display = 'none';
    }

    document.querySelector('.load').addEventListener('click', loadCatches);
    document.querySelector('#addForm').addEventListener('submit', onCreateCatch);
    document.querySelector('#logout').addEventListener('click', onLogout);
    document.querySelector('#catches').addEventListener('click', onCatchesClick);
});

function onCatchesClick(e) {
    const id = e.target.dataset.id;
    if (e.target.className == 'delete') {
        onDelete(e.target);
    } else if (e.target.className == 'update') {
        onEdit(e.target);
    }
}

async function onEdit(button) {
    const id = button.dataset.id;
    const currentCatch = button.parentElement;
    const angler = currentCatch.querySelector('.angler').value;
    const weight = currentCatch.querySelector('.weight').value;
    const species = currentCatch.querySelector('.species').value;
    const location = currentCatch.querySelector('.location').value;
    const bait = currentCatch.querySelector('.bait').value;
    const captureTime = currentCatch.querySelector('.captureTime').value;

    const newData = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime
    };

    await fetch('http://localhost:3030/data/catches/' + id, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        },
        body: JSON.stringify(newData)
    });

    loadCatches();
}

async function onDelete(button) {
    const id = button.dataset.id;
    await fetch('http://localhost:3030/data/catches/' + id, {
        method: 'delete',
        headers: {
            'X-Authorization': userData.token
        }
    });
    button.parentElement.remove();
}

async function onLogout() {
    if (!userData) {
        return;
    }

    await fetch('http:localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': userData.token
        }
    });
    sessionStorage.clear();
    window.location = 'myfurniture.html';
}

async function onCreateCatch(e) {
    if (!userData) {
        window.location = 'login.html';
        return;
    }
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {});
    try {
        if (Object.values(data).some(f => f == '')) {
            throw new Error('All fields are required!');
        }

        const res = await fetch('http://localhost:3030/data/catches ', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-authorization': userData.token
            },
            body: JSON.stringify(data)
        });

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
    } catch (err) {
        alert(err.message);
    }

    loadCatches();
    e.target.reset();
}

async function loadCatches() {
    const res = await fetch('http://localhost:3030/data/catches');
    const data = await res.json();

    document.querySelector('#catches').replaceChildren(...data.map(createCatch));
}

function createCatch(data) {
    const isOwner = (userData && userData.id == data._ownerId);

    const element = document.createElement('div');
    element.classList.add('catch');
    element.innerHTML =
        `<label>Angler</label>
<input type="text" class="angler" value="${data.angler}" ${!isOwner ? 'disabled' : ''}>
<label>Weight</label>
<input type="text" class="weight" value="${data.weight}" ${!isOwner ? 'disabled' : ''}>
<label>Species</label>
<input type="text" class="species" value="${data.species}" ${!isOwner ? 'disabled' : ''}>
<label>Location</label>
<input type="text" class="location" value="${data.location}" ${!isOwner ? 'disabled' : ''}>
<label>Bait</label>
<input type="text" class="bait" value="${data.bait}" ${!isOwner ? 'disabled' : ''}>
<label>Capture Time</label>
<input type="number" class="captureTime" value="${data.captureTime}" ${!isOwner ? 'disabled' : ''}>
<button class="update" data-id="${data._id}"  ${!isOwner ? 'disabled' : ''}>Update</button>
<button class="delete" data-id="${data._id}"  ${!isOwner ? 'disabled' : ''}>Delete</button>`

    return element;
}