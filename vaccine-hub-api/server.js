const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const {BadRequestError, NotFoundError} = require("../vaccine-hub-api/utils/errors")

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use((request, response, next) => {
    return next(new NotFoundError())
})

app.use((error, request, response, next) => {
    const status = error.status || 500
    const message = error.message

    return response.status(status).json({
        error: {message, status},
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`)
})