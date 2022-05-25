import {html} from "../../api/lib.js";
import {create} from "../../api/data.js";

const createTemplate = (onCreate) => html`
    <section id="create-listing">
        <div class="container">
            <form @submit="${onCreate}" id="create-form">
                <h1>Create Car Listing</h1>
                <p>Please fill in this form to create an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand">

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model">

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description">

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year">

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl">

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price">

                <hr>
                <input type="submit" class="registerbtn" value="Create Listing">
            </form>
        </div>
    </section>`;


export async function createPage(ctx) {
    ctx.render(createTemplate(onCreate));

    async function onCreate(e) {
        e.preventDefault();

        const createData = new FormData(e.target);
        const brand = createData.get('brand');
        const model = createData.get('model');
        const description = createData.get('description');
        let year = createData.get('year');
        const imageUrl = createData.get('imageUrl');
        let price = createData.get('price');

        if (brand == '' || model == '' || description == '' || year == '' || imageUrl == '' || price == '') {
            return alert('All fields are required!');
        }
        year = Number(year);
        price = Number(price);

        if (year < 0 || price < 0) {
            return alert('Year and Price must be positive numbers!');
        }

        await create({
            brand,
            model,
            description,
            year,
            imageUrl,
            price
        });

        ctx.page.redirect('/catalog');
    }
}
