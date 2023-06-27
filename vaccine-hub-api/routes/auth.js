const express = require('express')
const User = require("../models/user")
const router = express.Router()


router.post("/login", async (request, response, next) => {
    try{
        const user = await User.login(request.body)
        return response.status(200).json(user)
    }catch(error){
        next(error)
    }
})

router.post("/register", async (request, response, next) => {
    try{
        const user = await User.register(request.body)
        return response.status(201).json(user)
    }catch(error) {
        next(error)
    }
})

module.exports = router
