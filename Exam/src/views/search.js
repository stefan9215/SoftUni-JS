import {html} from "../../api/lib.js";
import {searchAlbum} from "../../api/data.js";

const searchTemplate = (onSearch, onChange, albums = [], user) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>

        <div class="search">
            <input @change="${onChange}" id="search-input" type="text" name="search"
                   placeholder="Enter desired albums's name">
            <button @click="${onSearch}" class="button-list">Search</button>
        </div>

        <h2>Results:</h2>

        <!--Show after click Search button-->
        <div class="search-result">
            <!--If have matches-->
            ${albums.length > 0
                    ? albums.map(album => html`
                        <div class="card-box">
                            <img src=${album.imgUrl}>
                            <div>
                                <div class="text-center">
                                    <p class="name">Name: ${album.name}</p>
                                    <p class="artist">Artist: ${album.artist}</p>
                                    <p class="genre">Genre: ${album.genre}</p>
                                    <p class="price">Price: $${album.price}</p>
                                    <p class="date">Release Date: ${album.date}</p>
                                </div>
                                ${user ? html`
                                    <div class="btn-group">
                                        <a href="/details/${album._id}" id="details">Details</a>
                                    </div>` : ''}
                            </div>
                        </div>`)
                    : html`<p class="no-result">No result.</p>`}

            <!--If there are no matches-->
        </div>
    </section>`;

export async function searchPage(ctx) {
    let query = '';
    ctx.render(searchTemplate(onSearch, onChange));

    function onChange(e) {
        query = e.target.value;
    }

    async function onSearch() {
        const user = JSON.parse(sessionStorage.getItem('userData'));
        if(query == '') {
            return alert('Search field is required!');
        }
        const albums = await searchAlbum(query);
        ctx.render(searchTemplate(onSearch, onChange, albums, user));
    }
}