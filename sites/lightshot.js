const cheerio = require("cheerio");
const request = require("request");
require('colors');
const random = require('../scripts/random')
const download = require('../scripts/download')
const Json = require('../scripts/jsonArray')
const toJson = new Json('./found_links.json')
const bad = ["//st.prntscr.com/2021/02/09/0221/img/0_173a7b_211be8ff.png", "//st.prntscr.com/2021/02/09/0221/img/footer-logo.png", "https://i.imgur.com/removed.png"]

module.exports = (lightshot) => {
    const {
        speed,
        files,
        characters
    } = lightshot
    if (speed < 750) throw new Error('Не устанавливайте скорость ниже 750! иначе ваш IP забанят!');
    setInterval(() => {
        const options = {
            url: "https://prnt.sc/" + random(5, 5, characters),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.97 Safari/537.36 Vivaldi/1.94.1008.34'
            }
        }
        const {
            url: link
        } = options
        request(options, (error, response, body) => {
            const $ = cheerio.load(body);
            const img = $('img').attr('src');

            if (
                bad.includes(img)
            ) return console.log(`${'[LightShot]'.gray}  ${"[-]".red} ${link}`);

            if (!toJson.lightshot) toJson.lightshot = []
            if (!toJson.lightshot.includes(link)) {
                toJson.lightshot.push(link)
                toJson.save()
            } else {
                return console.log(`${'[LightShot]'.gray}  ${"[+]".yellow} ${link}`);
            }

            console.log(`${'[LightShot]'.gray}  ${"[+]".green} ${link}`);

            if (files) {
                download(img, `./images/lightshot/${link.slice("https://prnt.sc/".length)}.png`);
            };
        });
    }, speed);
}
