import {e} from "../api/util.js";
import {deleteIdea, getIdeaById} from "../api/data.js";


const section = document.querySelector('#detailsPage');
section.remove();
let ctx = null;

export async function showDetailsPage(ctxtarget, id) {
    ctx = ctxtarget;
    ctx.render(section);

    const idea = await getIdeaById(id);
    section.replaceChildren(createDetails(idea));

}


function createDetails(idea) {

    const fragment = document.createDocumentFragment();
    fragment.appendChild(e('img', {className: 'det-img', src: idea.img}));
    fragment.appendChild(e('div', {className: 'desc'},
        e('h2', {className: 'display-5'}, idea.title),
        e('p', {className: 'infoType'}, 'Description:'),
        e('p', {className: 'idea-description'}, idea.description)));

    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData && userData.id == idea._ownerId) {
        fragment.appendChild(e('div', {className: 'text-center'},
            e('a', {className: 'btn detb', href: '', onClick: onDelete}, 'Delete')));
    }

    return fragment;

    async function onDelete(e) {
        e.preventDefault();
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteIdea(idea._id);
            ctx.goTo('catalog');
        }
    }
}
