const puppeteer = require('puppeteer')
const { validURL } = require('../utils/utilities')
const { scrap } = require('../service/reviewService')
const getReviewHandler = async (req, res) => {
    try {
        const url = req.body.url
        if (!validURL(url)) {
            res.status(400).send("Incorrect url format")
            return
        }

        var data = await scrap(url)
        res.send(data)

    } catch (err) {
        res.status(500).send("Internal server Error")
        console.log(err)
    }
}

module.exports =  { getReviewHandler }