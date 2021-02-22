const fs = require('fs')
const request = require('request')

/**
 * @param {String} url URL изображения
 * @param {String} filename Имя файла
 */
function download(url, filename) {
    if (!filename.endsWith(".png")) return;
    request.head(url, function() {
        request(url).pipe(fs.createWriteStream(filename));
    });
};

module.exports = download
