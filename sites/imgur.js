const request  = require("request");
const random   = require('../scripts/random');
const download = require('../scripts/download');
const notFound = require('../scripts/jsonArray');
const CL       = require('../scripts/CL');
const bad      = ["https://i.imgur.com/removed.png"];

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
        //if (!notFound.imgur) notFound.imgur = []
        if (notFound.imgur.includes(link)) return;
        request(options, (error, response, body) => {
            if (
                response.headers['content-type'] === "text/html" ||
                bad.includes(response.request.href)
            ) {
                notFound.imgur.push(link)
                notFound.save()
                return CL("Imgur    ", "-", link)
            }

            CL("Imgur    ", "+", link)

            if (files) {
                download(link, `./images/imgur/${response.request.href.slice("https://i.imgur.com".length)}`);
            }
        })
    }, speed);
}
