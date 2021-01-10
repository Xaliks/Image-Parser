const {
    file,
    speed,
    characters
} = require('./config.json')
const cheerio = require("cheerio");
const request = require("request");
const fs = require('fs')

setInterval(() => {
    function makeid(length) {
        let result = '';
        const charactersLength = characters.length;
        for(let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const options = {
        url: "https://prnt.sc/" + makeid(5),
        method: "GET",
        headers: {
            Accept: "text/html",
            "User-Agent": "Chrome",
        },
    };
    request(options, function(error, _response, responseBody) {
        if(error) return;
        const $ = cheerio.load(responseBody);
        const img = $('img').attr('src')
        if(String(img) === "//st.prntscr.com/2020/12/09/2233/img/0_173a7b_211be8ff.png") return;
        if(String(img) === "//st.prntscr.com/2020/12/09/2233/img/footer-logo.png") return;
        fs.appendFile(file, img + '\n', (err) => {
            if(err) return
        })
    });
}, speed)