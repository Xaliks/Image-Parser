const cheerio  = require("cheerio");
const request  = require("request");
const random   = require('../scripts/random');
const download = require('../scripts/download');
const CL       = require('../scripts/CL');

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
            if(body === 'error code: 1006') {
                CL("LightShot", "-", 'Ваш IP был забанен!')
                process.exit()
            }

            const $ = cheerio.load(String(body));
            const img = $('img').attr('src');

            if (
                !img ||
                img.startsWith('//st.prntscr.com')
            ) return CL("LightShot", "-", link)
            
            request({
                url: img
            }, (err, res, bdy) => {
                if (
                    res.request.href === "https://i.imgur.com/removed.png"
                ) return CL("LightShot", "-", link)

                CL("LightShot", "+", link)

                if (files) {
                    download(img, `./images/lightshot/${link.slice("https://prnt.sc/".length)}.png`);
                };
            })
        });
    }, speed);
}
