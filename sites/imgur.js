const request  = require("request");
const random   = require('../scripts/random');
const download = require('../scripts/download');
const CL       = require('../scripts/CL');

module.exports = (imgur) => {
    const {
        speed,
        files,
        characters
    } = imgur
    setInterval(() => {
        const options = {
            url: "https://i.imgur.com/" + random(5, 6, characters) + ".png",
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.97 Safari/537.36 Vivaldi/1.94.1008.34'
            }
        };
        const {
            url: link
        } = options
        request(options, (error, response, body) => {
            if (
                response.headers['content-type'] === "text/html" ||
                response.request.href === "https://i.imgur.com/removed.png"
            ) return CL("Imgur    ", "-", link)

            CL("Imgur    ", "+", link)

            if (files) {
                download(link, `./images/imgur/${response.request.href.slice("https://i.imgur.com".length)}`);
            }
        })
    }, speed);
}
