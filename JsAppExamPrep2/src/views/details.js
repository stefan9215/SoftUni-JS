import {html} from "../../api/lib.js";
import {deleteBook, getBooksById, getLikesById, getLikesByUser, likeBook} from "../../api/data.js";

const detailsTemplate = (book, isOwner, isLogged, onDelete, likes, like) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">
                <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                ${isOwner
                        ? html`
                            <a class="button" href="/edit/${book._id}">Edit</a>
                            <a @click="${onDelete}" class="button" href="javascript:void(0)">Delete</a>`
                        : isLogged
                                ? html`<a @click="${like}" class="button" href="javascript:void(0)">Like</a>`
                                : ''}
                <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${likes}</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const [books, likes] = await Promise.all([
        getBooksById(id),
        getLikesById(id)
    ]);
    console.log(likes)
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const isOwner = userData && (books._ownerId == userData.id);
    const isLogged = userData;

    ctx.render(detailsTemplate(books, isOwner, isLogged, onDelete, likes, like));

    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice) {
            await deleteBook(id);
            ctx.page.redirect('/');
        }
    }


    async function like(e) {
        e.preventDefault();

        await likeBook({
            id
        });
        ctx.page.redirect('/details/' + id);
    }
}

