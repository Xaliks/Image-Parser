const request = require("request");
require('colors');
const random = require('../scripts/random')
const download = require('../scripts/download')
const Json = require('../scripts/jsonArray')
const toJson = new Json('./found_links.json')
const bad = ["https://i.imgur.com/removed.png"]

module.exports = (imgur) => {
    const {
        speed,
        files,
        characters
    } = imgur
    setInterval(() => {
        const options = {
            url: "https://i.imgur.com/" + random(5, 6, characters) + ".png"
        };
        const {
            url: link
        } = options
        request(options, (error, response, body) => {
            if (
                String(response.headers['content-type']) === "text/html" ||
                bad.includes(response.request.href)
            ) return console.log(`${'[Imgur]'.gray}      ${"[-]".red} ${link}`);

            if (!toJson.imgur) toJson.imgur = []
            if (!toJson.imgur.includes(link)) {
                toJson.imgur.push(link)
                toJson.save()
            } else {
                return console.log(`${'[Imgur]'.gray}      ${"[+]".yellow} ${link}`);
            }

            console.log(`${'[Imgur]'.gray}      ${"[+]".green} ${link}`);

            if (files) {
                download(link, `./images/imgur/${response.request.href.slice("https://i.imgur.com".length)}`);
            }
        })
    }, speed);
}
