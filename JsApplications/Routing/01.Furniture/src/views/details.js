import {html, until} from "../lib.js";
import {deleteFurniture, details} from "../api/data.js";

const detailsTemplate = (itemPromise) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        ${until(itemPromise, html`<p>Loading &hellip;</p>`)}
    </div>`;

const itemTemplate = (item, isOwner, onDelete) => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${item.img}/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${item.make}</span></p>
        <p>Model: <span>${item.model}</span></p>
        <p>Year: <span>${item.year}</span></p>
        <p>Description: <span>${item.description}</span></p>
        <p>Price: <span>${item.price}</span></p>
        <p>Material: <span>${item.material}</span></p>
        ${isOwner ? html`
                    <div>
                        <a href="${`/edit/${item._id}`}" class="btn btn-info">Edit</a>
                        <a @click="${onDelete}" href="${`javascript:void(0)`}" class="btn btn-red">Delete</a>
                    </div>`
                : null}
    </div>`;

export function detailsPage(ctx) {
    ctx.render(detailsTemplate(getDetails(ctx.params.id, onDelete)));

    async function onDelete() {
        const checked = confirm('Are you sure?');

        if (checked) {
            await deleteFurniture(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}

async function getDetails(id, onDelete) {
    const result = await details(id);

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData == null) {
        return itemTemplate(result, false, onDelete);
    }
    const isOwner = userData.id == result._ownerId;

    return itemTemplate(result, isOwner, onDelete);
}