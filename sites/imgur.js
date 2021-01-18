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
            url: "https://i.imgur.com/" + random(5, 6, characters)
        };
        const {
            url: link
        } = options
        request(options, function(error, response, body) {
            if(
                !response ||
                !response.headers ||
                !response.request.href ||
                String(response.headers['content-type']) === "text/html" ||
                String(response.request.href) === 'https://i.imgur.com/removed.png'
            ) return console.log(`${'[Imgur]'.yellow}     ${"[-]".red} Не найдено`);

            console.log(`${'[Imgur]'.yellow}     ${"[+]".green} ${link}`);

            if(file) {
                fs.appendFile(file, link + '\n', function(err) {});
            }

            if(files) {
                download(link, `./imgur${response.request.path}`);
            }
        })
    }, speed);
}

/**
 * @param {Number} min Минимальное кол-во символов 
 * @param {Number} max Максимальное кол-во символов
 * @param {String} characters Символы
 */
function random(min, max, characters) {
    let result = '';
    let random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    for(let i = 0; i < random(min, max); i++) {
        result += characters.charAt(
            Math.floor(
                Math.random() * characters.length
            )
        );
    }
    return result + ".png";
}

/**
 * @param {String} url URL изображения
 * @param {String} filename Имя файла
 */
function download(url, filename) {
    request.head(url, function() {
        request(url).pipe(fs.createWriteStream(filename));
    });
};