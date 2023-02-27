const data = require('@playwright/test')

// code below available for all test files in the project
// this is another way to transfer data to the test insted of using forEach
exports.customTest = data.test.extend({
    testData: {
        username: "garnalka93@gmail.com",
        password: "Test1234!",
        attempt: 1
    }
})
