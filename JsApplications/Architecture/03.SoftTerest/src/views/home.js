
const section = document.querySelector('#homePage');
section.querySelector('#getStartedBtn').addEventListener('click', (e) => {
    e.preventDefault();
    ctx.goTo('catalog');
});
section.remove();

let ctx = null;
export async function showHomePage(ctxTarget) {
    ctx = ctxTarget;
    ctx.render(section);
    ctx.updateNav();
}