import {html} from "../../api/lib.js";
import {search} from "../../api/data.js";

const searchTemplate = (onSearch, onChange, cars = []) => html`
    <section id="search-cars">
        <h1>Filter by year</h1>

        <div class="container">
            <input @change="${onChange}" id="search-input" type="text" name="search"
                   placeholder="Enter desired production year">
            <button @click="${onSearch}" class="button-list">Search</button>
        </div>

        <h2>Results:</h2>
        <div class="listings">

            ${cars.length > 0
                    ? cars.map(carTemplate)
                    : html`<p class="no-cars"> No results.</p>`}
        </div>
    </section>`;

const carTemplate = (car) => html`
    <div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
        <h2>${car.brand} ${car.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>`;

export async function searchPage(ctx) {
    let year = '';
    ctx.render(searchTemplate(onSearch, onChange));

    function onChange(e) {
        year = e.target.value;
    }

    async function onSearch() {
        const cars = await search(year);
        ctx.render(searchTemplate(onSearch, onChange, cars));
    }
}

