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
        request({
            url: "https://yapx.ru/v/" + random(5, characters)
        }, function(error, response, body) {
            if(
                !response ||
                !body
            ) return;

            const $ = cheerio.load(body);
            const img = $('div img').attr('src')

            if(
                !img ||
                img === null ||
                String(img) === "//i.yapx.ru/404.gif"
            ) return console.log(`${'[Yapx]'.yellow}      ${"[-]".red} Не найдено`);

            console.log(`${'[Yapx]'.yellow}      ${"[+]".green} ${img}`);

            if(file) {
                fs.appendFile(file, img + '\n', function(err) {});
            };

            if(files) {
                download(img, `./yapx${response.request.path.slice(2)}.png`);
            };
        });
    }, speed);
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

/**
 * @param {Number} length Длина рандомных символов
 * @param {String} characters Символы
 * @return {String} Рандомные символы
 */
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