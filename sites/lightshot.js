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
    if(speed < 750) throw new Error('Не устанавливайте скорость ниже 750! иначе ваш IP забанят!')
    setInterval(() => {
        const options = {
            url: "https://prnt.sc/" + random(5, characters),
            method: "GET",
            headers: {
                Accept: "text/html",
                "User-Agent": "Chrome",
            },
        };

        request(options, function(error, response, body) {
            if(body === 'error code: 1006')
                throw new Error('Ваш IP был забанен в LightShot! Попробуйте перезагрузить ваш роутер!')

            const $ = cheerio.load(body);
            const img = $('img').attr('src');

            if(
                img === "//st.prntscr.com/2020/12/09/2233/img/0_173a7b_211be8ff.png" ||
                img === "//st.prntscr.com/2020/12/09/2233/img/footer-logo.png"
            ) return console.log(`${'[LightShot]'.yellow} ${"[-]".red} Не найдено`);

            request({
                url: img
            }, function(error, response, body) {

                if(response.request.href) {
                if(
                    String(response.request.href) === 'https://i.imgur.com/removed.png'
                ) return console.log(`${'[LightShot]'.yellow} ${"[-]".red} Не найдено`);
                }

                if(!img.startsWith('https://i.imgur.com/')) {
                    return console.log(`${'[LightShot]'.yellow} ${"[-]".red} Не с сервера Imgur`);
                }

                console.log(`${'[LightShot]'.yellow} ${"[+]".green} ${img}`);

                fs.appendFile(file, img + '\n', function(err) {

                });

                if(files) download(img, `./LightShot/${img.slice("https://i.imgur.com/".length)}`);
            })
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