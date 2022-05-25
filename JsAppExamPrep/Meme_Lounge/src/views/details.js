import {html} from "../../api/lib.js";
import {deleteMeme, getMemeById} from "../../api/data.js";

const detailsTemplate = (meme, isOwner, onDelete) => html`
    <section id="meme-details">
        <h1>Meme Title: ${meme.title} </h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${meme.imageUrl}>
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>${meme.description}</p>
                <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                ${isOwner ? html`
                            <a class="button warning" href="/edit/${meme._id}">Edit</a>
                            <button @click="${onDelete}" class="button danger">Delete</button>`
                        : ''}
            </div>
        </div>
    </section>`;

export async function detailsPage(ctx) {
    const meme = await getMemeById(ctx.params.id);
    const user = JSON.parse(sessionStorage.getItem('userData'));
    const isOwner = user && meme._ownerId == user.id;
    ctx.render(detailsTemplate(meme, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice) {
            await deleteMeme(ctx.params.id);
            ctx.page.redirect('/all-memes');
        }
    }
}