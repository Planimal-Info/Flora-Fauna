const { UnauthorizedError } = require("../utils/errors")

class User {
    static async login(credentials) {
        //submit email and password
        const loginInput = ["email", "password"]

        loginInput.forEach((element) => {
            if(!credentials.hasOwnProperty(element)){
                throw new BadRequestError(`Missing ${element} in request body`)
            }
        })

        //login logic goes here

        throw new UnauthorizedError("Wrong Password");
    }

    
    static async register(credentials) {
        //submit email and password
    }
}