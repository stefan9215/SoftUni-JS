const {chromium} = require('playwright-chromium');
const {assert} = require('chai');

describe('E2E Tests', async function () {
    this.timeout(5000);

    let page, browser;

    before(async () => {
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    it('should load and display all books', async () => {
        await page.goto('http://localhost:63342/JsApplications/Architecture/02.Book-Library/index.html?_ijt=6cvfg70nb5cb1nrrh484elglk8&_ij_reload=RELOAD_ON_SAVE');


    })
});