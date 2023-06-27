const bcrypt = require('bcrypt')
const db = require("../db")
const {UnauthorizedError, BadRequestError} = require('../utils/errors')
const {BCRYPT_WORK_FACTOR} = require("../config")
// const { validateFields } = require("../utils/validate")

class User {

    static async makePublicUser(user) {
        return {
            id: user.id,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            location: user.location,
            date: user.date
        }
    }



    static async login(credentials) {
        const requiredCreds = ["email", "password"]
        requiredCreds.forEach((field) => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        })


        const existingUser = await User.fetchUserByEmail(credentials.email)
        if (existingUser) {
          const isValid = await bcrypt.compare(credentials.password, existingUser.password)
          if(isValid){
            return User.makePublicUser(existingUser)
          }
        }




        throw new UnauthorizedError("Invalid Email or Password")
    }

    static async register(creds) {
        const { email, password, firstName, lastName, location, date } = creds
        const requiredCreds = ["email", "password", "firstName", "lastName", "location", "date"]
        // try {
        //   validateFields({ required: requiredCreds, obj: creds, location: "user registration" })
        // } catch (err) {
        //   throw err
        // }
        requiredCreds.forEach((field) => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        })
    
        const existingUserWithEmail = await User.fetchUserByEmail(email)
        if (existingUserWithEmail) {
          throw new BadRequestError(`Duplicate email: ${email}`)
        }
    
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
        const normalizedEmail = email.toLowerCase()
    
        const result = await db.query(
          `INSERT INTO users (
              password,
              first_name,
              last_name,
              email,
              location,
              date
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id,
                      email,            
                      first_name AS "firstName", 
                      last_name AS "lastName",
                      location,
                      date
                      `,
          [hashedPassword, firstName, lastName, normalizedEmail, location, date]
        )
    
        const user = result.rows[0]
    
        return User.makePublicUser(user)
      }
    static async fetchUserByEmail(email) {
        const result = await db.query(
          `SELECT id,
                  email, 
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  location,
                  date              
               FROM users
               WHERE email = $1`,
          [email.toLowerCase()]
        )
    
        const user = result.rows[0]
    
        return user
      }
}

module.exports = User;