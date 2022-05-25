import {html} from "../../api/lib.js";
import {searchAlbum} from "../../api/data.js";

const searchTemplate = (onSearchSubmit, onChange, albums = []) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>

        <div class="search">
            <input @change="${onChange}" id="search-input" type="text" name="search"
                   placeholder="Enter desired albums's name">
            <button @click=${onSearchSubmit} class="button-list">Search</button>
        </div>

        <h2>Results:</h2>
        ${albums.length == 0
                ? html`<p class="no-result">No result.</p>`
                : albums.map(singleSearchAlbum)
        }

        </div>
    </section>
`;

const singleSearchAlbum = (album) => html`
    <div class="search-result">
        <div class="card-box">
            <img src=${album.imgUrl}>
            <div>
                <div class="text-center">
                    <p class="name">Name: ${album.name}</p>
                    <p class="artist">Artist: ${album.artist}</p>
                    <p class="genre">Genre: ${album.genre}</p>
                    <p class="price">Price: ${album.price}</p>
                    <p class="date">Release Date: ${album.releaseDate}</p>
                </div>
                ${album.isLoggedIn
                        ?
                        html`
                            <div class="btn-group">
                                <a href="/details/${album._id}" id="details">Details</a>
                            </div>
                        `
                        : null
                }

            </div>
        </div>
`;


export async function searchPage(ctx) {
    let query = '';
    ctx.render(searchTemplate(onSearchSubmit, onChange))


    async function onChange(e) {
        query = e.target.value;
    }

    async function onSearchSubmit(e) {
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('userData'));
        if (query == '') {
            return alert('Search field is required');
        }

        const albumsFound = await searchAlbum(query);
        const newAlbums = albumsFound.map((album) => ({...album, isLoggedIn: Boolean(user)}));
        ctx.render(searchTemplate(onSearchSubmit, onChange, newAlbums));
    }

}