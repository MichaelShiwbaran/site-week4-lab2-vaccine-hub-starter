const {UnauthorizedError} = require('../utils/errors')

class User {
    static async login(credentials) {


        throw new UnauthorizedError("Invalid Email or Password")
    }

    static async register(credentials) {

    }
}

module.exports = User;