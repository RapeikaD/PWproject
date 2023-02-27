class homePage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.loginButton = page.locator('[value="Login"]');
        this.requiredItem = page.locator('.card-body').filter({hasText: 'ZARA COAT'});
        this.cartMenuButton = page.locator('nav>ul>li>button').filter({hasText: 'Cart'});
        this.ordersMenuButton = page.locator('nav>ul>li>button').filter({hasText: 'Orders'});
        this.checkoutButton = page.locator('.totalRow>button').filter({has: page.getByText('Checkout')});
        this.inBoxItemTitle = page.locator('.item__title');
        this.expiryDate = page.locator('.field.small>select');
        this.cvvCodeInput = page.locator('.field.small').filter({hasText: 'CVV Code ?'}).locator('input');
        this.nameOnCardInput = page.locator('.row .field').filter({hasText: 'Name on Card'}).locator('input');
        this.couponInput = page.locator('[name="coupon"]');
        this.countryInput = page.locator('[placeholder="Select Country"]');
        this.suggestedCountries = page.locator('.ta-results.list-group button');
        this.applyCouponButton = page.locator('[type="submit"]');
        this.placeOrderButton = page.locator('.action__submit');
        this.orderIDLocator = page.locator('.em-spacer-1 label').nth(1);
    }

    async open() {
        await this.page.goto('https://rahulshettyacademy.com/client')
    }

    async login(username, password) {
        await this.userName.fill(username);
        await this.password.type(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {homePage};
