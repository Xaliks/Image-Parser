const fs = require('fs')
const request = require('request')

/**
 * @param {String} url URL изображения
 * @param {String} filename Имя файла
 */
function download(url, filename) {
    url = String(url)
    filename = String(filename)
    if (
        filename.endsWith(".png") ||
        url.endsWith(".png") ||
        filename.endsWith(".jpg") ||
        url.endsWith(".jpg")
    ) {
        request.head(url, function() {
            request(url).pipe(fs.createWriteStream(filename));
        });
    }
};

module.exports = download
