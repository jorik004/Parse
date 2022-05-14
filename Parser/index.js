const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')

const parse = async () => {

    const url = 'https://restoran.kz/restaurant'
    const page = 3

    async function getHtml(url) {
        const { data } = await axios.get(url)
        return cheerio.load(data)
    }

    const $ = await getHtml(url)

    for(let i = 1; i <= page; i++){
        const selector = await getHtml(`https://2gis.kz/almaty/search/%D0%90%D0%B2%D1%82%D0%BE%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D1%8B%20(%D0%A1%D0%A2%D0%9E)/rubricId/9041/page/${i}`)
        let title
        let number

        // selector('.place-list-card__body').each((index, elem) => {
        //     title = selector(elem).find('.link-inherit-color').text()
        //     number = `${selector(elem).find('.phone-prefix').text()} ${selector(elem).find('.phone-code').text()} ${selector(elem).find('.phone-number').text()}`
        //     fs.appendFileSync('./db.txt', `${title}       ${number} \n`)
        // })
        // selector('.phone').each((index, elem) => {
        //     number = `${selector(elem).find('.phone-prefix').text()} ${selector(elem).find('.phone-code').text()} ${selector(elem).find('.phone-number').text()}`
        //     fs.appendFileSync('./db.txt', `    ${number} \n`)
        // })

        selector('._1h3cgic').each((index, elem) => {
            title = selector(elem).find('._hc69qa').text()
            console.log(title)
        })
    }
    

}

parse()