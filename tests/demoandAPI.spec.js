const {test, expect, request} = require('@playwright/test');
const {apiCalls} = require('./api/apiCalls.js');

let loginPayload = {
    userEmail: "garnalka93@gmail.com", userPassword: "Test1234!"
};
let orderPayload = {orders: [{country: "Belarus", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};
let response;

test.describe('This is for demo', () => {
    test.beforeAll(async () => {
        const APIContext = await request.newContext();
        const ApiCalls = new apiCalls(APIContext, loginPayload);
        response = await ApiCalls.createOrder(orderPayload);
    });

    test('Login and buy item', async ({page}) => {
        let loginButton = page.locator('[value="Login"]');
        let requiredItem = page.locator('.card-body').filter({hasText: 'ZARA COAT'});
        let cartMenuButton = page.locator('nav>ul>li>button').filter({hasText: 'Cart'});
        let ordersMenuButton = page.locator('nav>ul>li>button').filter({hasText: 'Orders'});
        let checkoutButton = page.locator('.totalRow>button').filter({has: page.getByText('Checkout')});
        let inBoxItemTitle = page.locator('.item__title');
        let expiryDate = page.locator('.field.small>select');
        let cvvCodeInput = page.locator('.field.small').filter({hasText: 'CVV Code ?'}).locator('input');
        let nameOnCardInput = page.locator('.row .field').filter({hasText: 'Name on Card'}).locator('input');
        let couponInput = page.locator('[name="coupon"]');
        let countryInput = page.locator('[placeholder="Select Country"]');
        let suggestedCountries = page.locator('.ta-results.list-group button');
        let applyCouponButton = page.locator('[type="submit"]');
        let placeOrderButton = page.locator('.action__submit');
        let orderIDLocator = page.locator('.em-spacer-1 label').nth(1);

        await page.goto('https://rahulshettyacademy.com/client');
        await page.locator('#userEmail').fill('garnalka93@gmail.com');
        await page.locator('#userPassword').type('Test1234!');
        await loginButton.click();
        await page.waitForLoadState('networkidle');
        //await page.locator('.card-body b').allTextContents();
        let itemName = await requiredItem.locator('h5>b').textContent();
        await requiredItem.locator('button').nth(1).click();

        await cartMenuButton.click();
        await expect(page.locator('.cartSection>h3')).toHaveText(itemName);
        await checkoutButton.click();
        await expect(page.locator('.item__quantity')).toContainText('1');
        await expect(inBoxItemTitle).toHaveText(itemName);
        await expiryDate.nth(0).selectOption('03');
        await expiryDate.nth(1).selectOption('03');
        await cvvCodeInput.fill('000');
        await nameOnCardInput.type('Test Name');
        await countryInput.type('Bel');
        await suggestedCountries.first().textContent();
        await suggestedCountries.allTextContents();
        await suggestedCountries.filter({hasText: 'Belarus'}).click();
        await expect(countryInput).toHaveValue('Belarus');
        await couponInput.type('rahulshettyacademy');
        await applyCouponButton.click();
        await page.waitForLoadState('networkidle');
        await placeOrderButton.click();
        await page.waitForLoadState('networkidle');
        let orderID = (await orderIDLocator.textContent()).replace('| ', '').replace(' |', '');
        console.log(orderID);

        await ordersMenuButton.click();
        let orderIDTable = page.locator('table tbody tr').filter({hasText: 'zara coat 3'}).locator('[scope="row"]').filter({hasText: orderID});
        await expect(orderIDTable).toHaveText(orderID);
        await page.pause()
    });

    test('API test', async ({page}) => {

        await page.addInitScript(value => {
            window.localStorage.setItem('token', value);
        }, response.token);

        let ordersMenuButton = await page.locator('nav>ul>li>button').filter({hasText: 'Orders'});
        await page.goto('https://rahulshettyacademy.com/client');
        await page.waitForLoadState('networkidle');


        // mock request section
        // await ordersMenuButton.click();
        // await page.waitForLoadState('networkidle');
        // await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63ad50d103841e9c9a63f055',
        //      route => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'})
        // );
        // await page.locator('tbody tr').filter({hasText: '63ad50d103841e9c9a63f055'}).locator('text=View').click();
        // await page.pause();

        // mock request
        await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63983b4703841e9c9a52e87d',
            async route => {
                //intercept response -> replace it with our fake response -> send fake response tro browser
                let realResponse = page.request.fetch(route.request());
                let fakeRespBody = {"data": [], message: "No Orders"};
                route.fulfill({realResponse, fakeRespBody,})
            });


        // block CSS (incoming)
        //await page.route('**/*.css', route =>route.abort()); // block all URLs everything before slash in URL and everything after slash in URL
        // block images (incoming)
       // await page.route('**/*.{jpg,png,jpeg}', route => route.abort());

// show all request URLs
        page.on('request',request=> console.log(request.url()));
// show all request URLs
        page.on('response',response=> console.log(response.url(), response.status()));

        await ordersMenuButton.click();
        await page.pause();
        console.log('passed')

    });
});
