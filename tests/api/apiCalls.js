class apiCalls {
    constructor(APIContext, loginPayload) {
        this.APIContext = APIContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        let token;
        let respons = await this.APIContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: this.loginPayload
        });
        return token = (await respons.json()).token;
    }

    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToken();
        let orderResponse = await this.APIContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                },
                data: orderPayload

            }
        );
        let orderID = (await orderResponse.json());
        console.log(orderID.orders[0]);
        console.log(response);
        response.orderID = orderID.orders[0];

        return response;
    }

}

module.exports = {apiCalls};
