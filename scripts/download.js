const fs = require('fs')
const request = require('request')

/**
 * @param {String} url URL изображения
 * @param {String} filename Имя файла
 */
module.exports = function download(url, filename) {
    if (!url || !filename) return;
    
    url = String(url)
    filename = String(filename)
    if (
        filename.endsWith(".png") &&
        url.endsWith(".png")
    ) {
        request.head(url, function() {
            request(url).pipe(fs.createWriteStream(filename));
        });
    }
};
