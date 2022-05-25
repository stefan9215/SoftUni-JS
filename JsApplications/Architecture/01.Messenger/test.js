const {chromium} = require('playwright-chromium');
const {assert} = require('chai');

describe('Tests', async function () {
    this.timeout(50000);

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

    it('Refresh button works', async () => {
        await page.goto('http://localhost:63342/JsApplications/Architecture/01.Messenger/index.html?_ijt=56l927ldgka988as42kltga3vj');

        await page.click('text = Refresh');
        const content = await page.textContent('textarea');

        assert.equal('Spami: Hello, are you there?\n' +
            'Garry: Yep, whats up :?\n' +
            'Spami: How are you? Long time no see? :)\n' +
            'George: Hello, guys! :))\n' +
            'Spami: Hello, George nice to see you! :)))', 'Spami: Hello, are you there?\n' +
            'Garry: Yep, whats up :?\n' +
            'Spami: How are you? Long time no see? :)\n' +
            'George: Hello, guys! :))\n' +
            'Spami: Hello, George nice to see you! :)))')
    });

    it.only('should add new message', async () => {
        await page.goto('http://localhost:63342/JsApplications/Architecture/01.Messenger/index.html?_ijt=56l927ldgka988as42kltga3vj');

        await page.fill('#author', 'Pesho');
        await page.fill('#content', 'Hi. I\'m Pesho');

        const [response] = await Promise.all([
            page.waitForResponse('**/jsonstore/messenger'),
            page.click('text = Send')
        ]);

        const postData = JSON.parse(response.request().postData());

        assert.equal(postData.author, 'Pesho');
        assert.equal(postData.content, 'Hi. I\'m Pesho');
    });
});