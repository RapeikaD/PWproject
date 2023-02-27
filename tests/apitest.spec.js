const {test} = require('@playwright/test');
//const {apiCalls} = require('./api/apiCalls.js');
// login via ui save session and copy to .json

// do some tests, order check history using browser with properties from saved .json


let webContext; // for global usage

test.describe('This is for demo', () => {
    test.beforeAll(async ({browser}) => {
        let context = await browser.newContext();
        let page = await context.newPage();

        let loginButton = page.locator('[value="Login"]');

        await page.goto('https://rahulshettyacademy.com/client');
        await page.locator('#userEmail').fill('garnalka93@gmail.com');
        await page.locator('#userPassword').type('Test1234!');
        await loginButton.click();
        await page.waitForLoadState('networkidle');

        await context.storageState({path: 'state.json'});
        webContext = await browser.newContext({storageState:'state.json'});

    });


    test('Login and buy item', async () => {
        let page = await webContext.newPage();
        await page.goto('https://rahulshettyacademy.com/client');
        //await page.pause();

        console.log('pause')
    });
});
