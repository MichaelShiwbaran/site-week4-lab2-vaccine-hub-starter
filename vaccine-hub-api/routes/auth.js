const express = require('express')
const user = require("../models/user")
const router = express.Router()


router.post("/login", async (request, response, next) => {
    try{

    }catch(error){
        next(error)
    }
})

router.post("/register", async (request, respoonse, next) => {
    try{

    }catch(error) {
        next(error)
    }
})

module.exports = router
