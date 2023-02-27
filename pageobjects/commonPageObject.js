const {homePage} = require('./homePage');
const {mainPage} = require('./mainPage');

class commonPageObject {
    constructor(page) {
        this.page = page;
        this.HomePage = new homePage(this.page);
        this.MainPage = new mainPage(this.page);
    }

    getLoginPage(){
        return this.HomePage;
    }

    getMainPage(){
        return this.MainPage;

    }
}
module.exports = {commonPageObject}
