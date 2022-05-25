import {createIdea} from "../api/data.js";

const section = document.querySelector('#createPage');
const createForm = section.querySelector('form');
section.remove();

createForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const createData = new FormData(createForm);

    const title = createData.get('title');
    const description = createData.get('description');
    const img = createData.get('imageURL');

    if (title.length < 6) {
        return alert('Title must be at least 6 characters long!')
    }
    if (description.length < 10) {
        return alert('Description must be at least 10 characters long!')
    }
    if (img.length < 5) {
        return alert('Image must be at least 5 characters long!')
    }

    const data = {title, description, img};

    await createIdea(data);
    ctx.goTo('catalog');
});

let ctx = null;

export async function showCreatePage(ctxTarget) {
    ctx = ctxTarget
    ctx.render(section);
}