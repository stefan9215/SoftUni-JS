import {html} from "../../api/lib.js";
import {getById, update} from "../../api/data.js";

const editTemplate = (onEdit, car) => html`
    <section id="edit-listing">
        <div class="container">

            <form @submit="${onEdit}" id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand}>

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" .value=${car.model}>

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" .value=${car.year}>

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" .value=${car.price}>

                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>`;


export async function editPage(ctx) {
    const carId = ctx.params.id;
    const car = await getById(carId);

    ctx.render(editTemplate(onEdit, car));


    async function onEdit(e) {
        e.preventDefault();
        const editData = new FormData(e.target);
        const brand = editData.get('brand');
        const model = editData.get('model');
        const description = editData.get('description');
        let year = editData.get('year');
        const imageUrl = editData.get('imageUrl');
        let price = editData.get('price');

        if (brand == '' || model == '' || description == '' || year == '' || imageUrl == '' || price == '') {
            return alert('All fields are required!');
        }
        year = Number(year);
        price = Number(price);

        if (year < 0 || price < 0) {
            return alert('Year and Price must be positive numbers!');
        }

        await update(carId, {
            brand,
            model,
            description,
            year,
            imageUrl,
            price
        });
        ctx.page.redirect('/details/' + carId);
    }

}