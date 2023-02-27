const {test, expect} = require('@playwright/test');

test('First test+browser', async ({browser}) => {
    let context = await browser.newContext();
    let page = await context.newPage();
    await page.goto('https://www.google.com/');
    await expect(page).toHaveURL(/www.google.com/);
});

test('2nd test', async ({browser, page}) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveURL(/www.google.com/);
    let searchBar = await page.locator('[jsname="vdLsw"]');
    let luckyButton = await page.locator('[class="RNmpXc"]').nth(1);
    //await luckyButton.click();
    //await page.waitForTimeout(5000);

    // await page.goto('https://www.google.com/');
    await searchBar.type('youtube');
    await searchBar.press('Enter');
    //await page.waitForTimeout(5000);
    let firstResult = await page.locator('[data-async-context="query:youtube"]');
    let text = await firstResult.textContent();
    await expect(firstResult).toContainText('youtube')
    await expect(firstResult).toContainText('Язык программирования')
    //console.log(text)

});

test('default', async ({page}) => {
    let userNameField = page.locator('#username');
    let passwordField = page.locator('[type="password"]');
    let signInButton = page.locator('#signInBtn');
    let textLocator = await page.locator("[style*='block']");
    let dropdown = page.locator('.form-group > select');
 let radiobutton = page.locator('.radiotextsty').last(); // click?
    let phoneLocator = page.locator('.card-body .card-title');
    let confirmation = page.locator('#okayBtn');
    let checkBox = page.locator('#terms');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise');
    await userNameField.fill('rahulshettyacademy');
    await passwordField.type('learning');


    await dropdown.selectOption('consult');
    await radiobutton.click();
    await confirmation.click();

    // command to block some API response ?
    await page.route('**/*.css', route =>route.abort()); // block all URLs everything before slash in URL and everything after slash in URL



    console.log(await radiobutton.isChecked());
    console.log(await expect(radiobutton).toBeChecked());
    await checkBox.click();
    console.log(await expect(checkBox).toBeChecked());
    await checkBox.uncheck();
    expect(await checkBox.isChecked()).toBeFalsy();
   await expect(page.locator('[href="https://rahulshettyacademy.com/documents-request"]')).toHaveClass('blinkingText')
    await expect(page.locator('[href="https://rahulshettyacademy.com/documents-request"]')).toHaveAttribute('class','blinkingText')
    //await confirmation.click();

   // await page.pause();

    // await Promise.all([
    //     page.waitForNavigation(),
    //     signInButton.click(),]
    // );

    //console.log(await phoneLocator.first().textContent());
    //console.log(await phoneLocator.nth(0).textContent());

    //let allTitles = await phoneLocator.allTextContents();
    //console.log(allTitles);
});

test('child win test',async ({browser})=>{
    let context = await browser.newContext();
    let page = await context.newPage();
    const userNameField = page.locator('#username');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise');
    let textLink = page.locator('[href="https://rahulshettyacademy.com/documents-request"]');

    let [newPage] = await Promise.all([
        context.waitForEvent('page'),
        await textLink.click(),]
    );
    let textLine = await newPage.locator('.red').textContent()
    console.log(textLine);
    let arrays = textLine.split('@');
    let domainName = arrays[1].split(' ')[0];
    await userNameField.type(domainName);

});

test('d2', async ({browser, page}) => {
    //https://rahulshettyacademy.com/client/auth/login
    //garnalka93@gmail.com
    //Test123!

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail2').fill('garnalka93@gmail.com'); //err
    await page.locator('#userPassword').type('Test1234!');
    await page.locator('[value="Login"]').click();

    await page.waitForLoadState('networkidle'); // wait for all api calls
    let titles = await page.locator('.card-body b').allTextContents();
    console.log(titles)


});
