const express = require('express')
const reviewRouter = require('./router/reviewRoute')
require('dotenv').config()
const app  = express()
const port = process.env.PRODUCTION_HOST_PORT || 3000

app.use(express.json())

app.use('/review-api' , reviewRouter)

app.listen(port , () => { console.log(`Server is live on ${port}`)})