const cheerio = require("cheerio");
const request = require("request");
const fs = require('fs');
require('colors');

module.exports = (yapx) => {
    const {
        speed,
        file,
        files,
        characters
    } = yapx
    setInterval(() => {
        const options = {
            url: "https://yapx.ru/v/" + random(5, characters),
            method: "GET",
            headers: {
                Accept: "text/html",
                "User-Agent": "Chrome",
            },
        };

        request(options, function(error, response, body) {
            const $ = cheerio.load(body);
            const img = $('div img').attr('src')

            if(
                String(img) === "//i.yapx.ru/404.gif"
            ) return console.log(`${'[Yapx]'.yellow}      ${"[-]".red} Не найдено`);

            console.log(`${'[Yapx]'.yellow}      ${"[+]".green} ${img}`);

            fs.appendFile(file, img + '\n', function(err) {});

            if(files) download(img, `./Yapx${response.request.path.slice(2)}.png`);
        });
    }, speed);
}

function download(uri, filename) {
    request.head(uri, function() {
        request(uri).pipe(fs.createWriteStream(filename));
    });
};

function random(length, characters) {
    let result = '';
    for(let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(
                Math.random() * characters.length
            )
        );
    }
    return result;
}