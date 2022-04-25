const puppeteer = require('puppeteer')
async function scrap(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    try {
        var response = await page.goto(url)
        const status = response.status()

        if(status != 200) {
            return {
                status : "success" , 
                message : "Url unable to load"
            }
        }
    } catch (err) {
        return {
            status: "fail",
            message: "Provide correct url"
        }
    }

    var reviewResults = await page.$$eval('#customerReviews > #customerReviews', (reviewResult) => {
        var jsonDoc = []
        for (let customer of reviewResult) {
            let rating = customer.querySelector('div > div.leftCol > dl.itemReview > dd:nth-child(2) > div > strong').textContent
            let reviewerDetail = Array.from(customer.querySelectorAll('div > div.leftCol > dl.reviewer > dd')).map((elm) => elm.textContent)
            let reviewDetail = Array.from(customer.querySelectorAll('div > div.rightCol > blockquote > h6 , p')).map((elm) => elm.textContent)

            jsonDoc.push({
                reviewer: reviewerDetail[0],
                reviewDate: reviewerDetail[1],
                reviewRating: rating,
                reviewTitle: reviewDetail[0],
                reviewComment: reviewDetail[1]
            })
        }
        return jsonDoc
    })
    await browser.close()

    if(reviewResults.length == 0) return {
        status : "success" , 
        message : "No reviews on this page"
    }
    return {
        status : "success" , 
        data : reviewResults
    }
}

module.exports = {scrap}