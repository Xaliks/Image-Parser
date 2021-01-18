const cheerio = require("cheerio");
const request = require("request");
const fs = require('fs');
require('colors');

module.exports = (lightshot) => {
    const {
        speed,
        file,
        files,
        characters
    } = lightshot
    if(speed < 750) throw new Error('Не устанавливайте скорость ниже 750! иначе ваш IP забанят!');
    setInterval(() => {
        request({
            url: "https://prnt.sc/" + random(5, characters)
        }, function(error, response, body) {
            if(
                !response ||
                !body
            ) return;

            if(body === 'error code: 1006')
                throw new Error('Ваш IP был забанен в LightShot! Попробуйте перезагрузить ваш роутер!');

            const $ = cheerio.load(body);
            const img = $('img').attr('src');

            if(
                !img ||
                img === null ||
                img === "//st.prntscr.com/2020/12/09/2233/img/0_173a7b_211be8ff.png" ||
                img === "//st.prntscr.com/2020/12/09/2233/img/footer-logo.png"
            ) return console.log(`${'[LightShot]'.yellow} ${"[-]".red} Не найдено`);

            request({
                url: img
            }, function(error, response, body) {
                if(
                    !response ||
                    !response.request.href ||
                    String(response.request.href) === 'https://i.imgur.com/removed.png'
                ) return console.log(`${'[LightShot]'.yellow} ${"[-]".red} Не найдено`);

                if(!img.startsWith('https://i.imgur.com/')) {
                    return console.log(`${'[LightShot]'.yellow} ${"[-]".red} Не с сервера Imgur`);
                }

                console.log(`${'[LightShot]'.yellow} ${"[+]".green} ${img}`);

                if(file) {
                    fs.appendFile(file, img + '\n', function(err) {});
                };

                if(files) {
                    download(img, `./lightshot/${img.slice("https://i.imgur.com/".length)}`);
                };
            })
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