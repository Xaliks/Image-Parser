const cheerio  = require("cheerio");
const request  = require("request");
const random   = require('../scripts/random');
const download = require('../scripts/download');
const CL       = require('../scripts/CL');
const bad      = ["//st.prntscr.com/2021/02/09/0221/img/0_173a7b_211be8ff.png", "//st.prntscr.com/2021/02/09/0221/img/footer-logo.png", "https://i.imgur.com/removed.png"];

module.exports = (lightshot) => {
    const {
        speed,
        files,
        characters
    } = lightshot
    setInterval(() => {
        const options = {
            url: "https://prnt.sc/" + random(5, 5, characters),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.97 Safari/537.36 Vivaldi/1.94.1008.34'
            }
        }
        const link = options.url
        request(options, (error, response, body) => {
            const $ = cheerio.load(String(body));
            const img = $('img').attr('src');

            request({
                url: img
            }, (err, res, bdy) => {
                if (
                    bad.includes(img) ||
                    bad.includes(res ? res.request.href : undefined)
                ) return CL("LightShot", "-", link)

                CL("LightShot", "+", link)

                if (files) {
                    download(img, `./images/lightshot/${link.slice("https://prnt.sc/".length)}.png`);
                };
            })
        });
    }, speed);
}