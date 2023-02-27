const {test, expect, request} = require('@playwright/test');

class mainPage {
    constructor(page) {
        this.page = page;
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

//store locator + dynamic variable for locator
    customCardLocator(cardName) {
        return this.page.locator("h3:has-text('"+cardName+"')")
    }

    async openCard() {
        await this.requiredItem.locator('button').nth(1).click();
        await this.cartMenuButton.click();
    }

    async verifyItemName(itemName) {
        await expect(this.page.locator('.cartSection>h3')).toHaveText(itemName);
    }

    async checkoutProduct() {
        await this.checkoutButton.click();
        await expect(this.page.locator('.item__quantity')).toContainText('1');
    }
    async fillBillingInfo(){
         await this.expiryDate.nth(0).selectOption('03');
         await this.expiryDate.nth(1).selectOption('03');
         await this.cvvCodeInput.fill('000');
         await this.nameOnCardInput.type('Test Name');
         await this.countryInput.type('Bel');
         await this.suggestedCountries.first().textContent();
         await this.suggestedCountries.allTextContents();
         await this.suggestedCountries.filter({hasText: 'Belarus'}).click();
         await expect(this.countryInput).toHaveValue('Belarus');
         await this.couponInput.type('rahulshettyacademy');
         await this.applyCouponButton.click();
         await this.page.waitForLoadState('networkidle');
    }
    async getOrderID() {
        return (await this.orderIDLocator.textContent()).replace('| ', '').replace(' |', '');
    }

    async getTableOrderID(orderID) {
        return this.page.locator('table tbody tr').filter({hasText: 'zara coat 3'}).locator('[scope="row"]').filter({hasText: orderID});
    }
}

module.exports = {mainPage};
