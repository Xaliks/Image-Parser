const request = require("request");
const fs = require('fs');
require('colors');

module.exports = (imgur) => {
    const {
        speed,
        file,
        files,
        characters
    } = imgur
    setInterval(() => {
        const options = {
            url: "https://i.imgur.com/" + random(5, 6, characters),
            method: "GET",
            headers: {
                Accept: "text/html",
                "User-Agent": "Chrome",
            },
        };
        const link = options.url
        request(options, function(error, response, body) {
            if(
                String(response.headers['content-type']) === "text/html" ||
                String(response.request.href) === 'https://i.imgur.com/removed.png' ||
                !String(response.request.href).endsWith('.png')
            ) return console.log(`${'[Imgur]'.yellow}     ${"[-]".red} Не найдено`);

            console.log(`${'[Imgur]'.yellow}     ${"[+]".green} ${link}`);

            fs.appendFile(file, link + '\n', function(err) {

            });

            if(files) download(link, `./imgur${response.request.path}`);
        })
    }, speed);
}

function random(min, max, characters) {
    let result = '';
    for(let i = 0; i < getRandomInRange(min, max); i++) {
        result += characters.charAt(
            Math.floor(
                Math.random() * characters.length
            )
        );
    }
    return result + ".png";
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function download(uri, filename) {
    request.head(uri, function() {
        request(uri).pipe(fs.createWriteStream(filename));
    });
};