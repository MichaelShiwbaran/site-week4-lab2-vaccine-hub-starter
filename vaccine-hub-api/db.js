const { Client } = require('pg')
const {getDataBaseURL} = require('./config')
require('colors')

const db = new Client({connectionString: getDataBaseURL()})

db.connect((error) => {
    if (error) {
        console.error("connection error" .red, error.stack)
    } else {
        console.log("Suucessfully connected to postgres db".green)
    }
})

module.exports = db;