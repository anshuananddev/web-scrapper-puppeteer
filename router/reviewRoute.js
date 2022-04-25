const express = require('express')
const { getReviewHandler } = require('../controller/reviewController')


const router = express.Router()

router.post('/getReviews' , getReviewHandler)

module.exports = router