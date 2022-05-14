const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

(async () => {
    
    //LINK website
    const url = 'URL'
    //Page count
    const page = 5
    
    //Getting html tags into an object
    async function getHtml(url) {
        const { data } = await axios.get(url)
        return cheerio.load(data)
    }

    const $ = await getHtml(url)

    //Surf pages and getting information
    for(let i = 1; i <= page; i++){
        const selector = await getHtml(`url/${i}`)
        let title
        let number

        selector('.place-list-card__body').each((index, elem) => {
            title = selector(elem).find('.link-inherit-color').text()
            number = `${selector(elem).find('.phone-prefix').text()} ${selector(elem).find('.phone-code').text()} ${selector(elem).find('.phone-number').text()}`
            fs.appendFileSync('./db.txt', `${title}       ${number} \n`)
        })
        selector('.phone').each((index, elem) => {
            number = `${selector(elem).find('.phone-prefix').text()} ${selector(elem).find('.phone-code').text()} ${selector(elem).find('.phone-number').text()}`
            fs.appendFileSync('./db.txt', `    ${number} \n`)
        })
    }
    

})()

