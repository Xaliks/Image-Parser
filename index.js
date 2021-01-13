const {
    file,
    speed,
    characters,
    files
} = require('./config.json')
if(speed < 750) throw new Error('Не устанавливайте скорость ниже 750! иначе ваш ID забанят!')
const cheerio = require("cheerio");
const request = require("request");
const fs = require('fs')
require('colors');

setInterval(() => {
    const options = {
        url: "https://prnt.sc/" + random(5),
        method: "GET",
        headers: {
            Accept: "text/html",
            "User-Agent": "Chrome",
        },
    };

    request(options, function(error, _response, responseBody) {
        if(responseBody === 'error code: 1006') throw new Error('Ваш IP был забанен в LightShot! Попробуйте перезагрузить ваш роутер!')
        const $ = cheerio.load(responseBody);
        const img = $('img').attr('src');
        if(
            String(img) === "//st.prntscr.com/2020/12/09/2233/img/0_173a7b_211be8ff.png" ||
            String(img) === "//st.prntscr.com/2020/12/09/2233/img/footer-logo.png"
        ) return console.log('[-]'.red + ' Не найдено');
        if(!String(img).startsWith('https://i.imgur.com/')) return console.log('[-]'.red + ' Не с сервера imgur');

        fs.appendFile(file, img + '\n')

        console.log('[+] '.green + img)

        if(files) download(img, `./images/${img.slice("https://i.imgur.com/".length)}`)
    });
}, speed)

function download(uri, filename) {
    request.head(uri, function() {
        request(uri).pipe(fs.createWriteStream(filename));
    });
};

function random(length) {
    let result = '';
    const charactersLength = characters.length;
    for(let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}