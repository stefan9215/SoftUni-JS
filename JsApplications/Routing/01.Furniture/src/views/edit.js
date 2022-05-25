import {html, until} from "../lib.js";
import {details, updateFurniture} from "../api/data.js";

const editTemplate = (editPromise) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Edit Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
        ${until(editPromise, html`<p>Loading Details &hellip;</p>`)}
    </div>`;

const formTemplate = (furniture, onEdit) => html`
    <form @submit="${onEdit}">
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control" id="new-make" type="text" name="make" value="${furniture.make}">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control" id="new-model" type="text" name="model"
                           value="${furniture.model}">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control" id="new-year" type="number" name="year"
                           value="${furniture.year}">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name="description"
                           value="${furniture.description}">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price" value="${furniture.price}">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img" value="${furniture.img}">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material"
                           value="${furniture.material}">
                </div>
                <input type="submit" class="btn btn-info" value="Edit"/>
            </div>
        </div>
    </form>`;

export function editPage(ctx) {
    ctx.render(editTemplate(getDetails(ctx.params.id, onEdit)));

    async function onEdit(e) {
        e.preventDefault();
        const editData = [...(new FormData(e.target)).entries()];

        const data = editData.reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {});

        await updateFurniture(ctx.params.id, data);
        ctx.page.redirect('/details/' + ctx.params.id);
    }

}

async function getDetails(id, onEdit) {
    const result = await details(id);

    return formTemplate(result, onEdit);
}