const {test, expect, request} = require('@playwright/test');
// json ->string->js object
const userData = JSON.parse(JSON.stringify((require('../userdata'))));

const {homePage} = require('../pageobjects/homePage');
const {mainPage} = require('../pageobjects/mainPage');
// alternative solution to do "require" only once
const {commonPageObject} = require('../pageobjects/commonPageObject');
//alternative way of passing data from ouside ( via fixtures "test-base.js"
const {customTest} = require('../fixtures/test-base');


test.describe.configure({mode:'parallel'});

test.describe('This is for demo', () => {
    userData.forEach((item) => {
        // alternative of parametrisation:
        // for(const data of userData) {}

        test(`Login and buy item ${item.attempt}`, async ({page}) => {
            const HomePage = new homePage(page);
            const MainPage = new mainPage(page);
            // alternative
            const PageObjects = new commonPageObject(page);
            const MainPageTwo = await PageObjects.getMainPage();

            await HomePage.open();
            await HomePage.login(item.username, item.password);

            let itemName = await MainPage.requiredItem.locator('h5>b').textContent();

            await MainPage.openCard();
            //alternative
            //await MainPageTwo.openCard();

            await MainPage.verifyItemName(itemName);
            await MainPage.checkoutProduct();
            await MainPage.fillBillingInfo();
            await MainPage.placeOrderButton.click();
            await page.waitForLoadState('networkidle');
            let orderId = await MainPage.getOrderID();
            console.log(orderId);

            await MainPage.ordersMenuButton.click();
            let tableOrderId = await MainPage.getTableOrderID(orderId);
            await expect(tableOrderId).toHaveText(orderId);
            await page.pause()
        });
    });


    customTest(`Fixtures example`, async ({page, testData}) => {
        const HomePage = new homePage(page);
        const MainPage = new mainPage(page);
        // alternative
        const PageObjects = new commonPageObject(page);
        const MainPageTwo = await PageObjects.getMainPage();

        await HomePage.open();
        await HomePage.login(testData.username, testData.password);

        let itemName = await MainPage.requiredItem.locator('h5>b').textContent();

        await MainPage.openCard();
        //alternative
        //await MainPageTwo.openCard();

        await MainPage.verifyItemName(itemName);
        await MainPage.checkoutProduct();
        await MainPage.fillBillingInfo();
        await MainPage.placeOrderButton.click();
        await page.waitForLoadState('networkidle');
        let orderId = await MainPage.getOrderID();
        console.log(orderId);

        await MainPage.ordersMenuButton.click();
        let tableOrderId = await MainPage.getTableOrderID(orderId);
        await expect(tableOrderId).toHaveText(orderId);
        await page.pause()
    });
});
