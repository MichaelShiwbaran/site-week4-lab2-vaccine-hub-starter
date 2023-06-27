require("dotenv").config()
require("colors")

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001

function getDataBaseURL(){
    const dbuser = process.env.DATABASE_USER || 'postgres'
    const dbpass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS): "newpostgrespassword"
    const dbhost = process.env.DATABASE_HOST || "localhost"
    const dbport = process.env.DATABASE_PORT || 5432
    const dbname = process.env.DATABASE_NAME || "vaccine_hub"


    return process.env.DATABASE_URL || `postgresql://${dbuser}:${dbpass}@${dbhost}:${dbport}/${dbname}`
}

const BCRYPT_WORK_FACTOR = 13

console.log("process.env", Object.keys(process.env))
console.log("App Config")
console.log("PORT:", PORT)
console.log("Database URI:", getDataBaseURL())
console.log("---")

module.exports = {
    PORT,
    getDataBaseURL,
    BCRYPT_WORK_FACTOR
}