const {test, expect} = require('@playwright/test');

test.describe('This is second demo file web', () => {
    test('Go back in browser', async ({page}) => {
        await page.goto('https://rahulshettyacademy.com/AutomationPractice');
        // await page.goto('www.google.com');
        // await page.goBack();
        // await page.goForward();

        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator('#hide-textbox').click();
        await expect(page.locator("#displayed-text")).toBeHidden();
        page.on('dialog', dialog => dialog.accept());
        await page.locator('#confirmbtn').click();
        await page.locator('#mousehover').hover();

        let childFrame = page.frameLocator('#courses-iframe');
        await childFrame.locator('li a[href*="lifetime-access"]:visible').click();
        let text = await childFrame.locator(".text h2").textContent();
        console.log(text.split(' ')[1]);
    });

    test('Screenshots test web ui',async({page})=>{
        await page.goto('https://www.google.com/');
        await expect(page).toHaveURL(/www.google.com/);
        let searchBar = await page.locator('[jsname="vdLsw"]');
        let luckyButton = await page.locator('[class="RNmpXc"]').nth(1);


        await page.screenshot({path:'extrascreenshot.png'});
        expect(await page.screenshot()).toMatchSnapshot('extrascreenshot.png');

        //await page.pause();
        await searchBar.type('youtube');
        //searchBar.screenshot({path:'locatorscreen.png'});
        await searchBar.press('Enter');
        await page.waitForLoadState('networkidle');
        //expect(await page.screenshot()).toMatchSnapshot('extrascreenshot.png')
    });
});

