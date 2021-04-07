/**
 * @param {Number} min Минимальное кол-во символов 
 * @param {Number} max Максимальное кол-во символов
 * @param {String} characters Символы
 */
module.exports = function random(min, max, characters) {
    this.result = '';
    let random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    for (let i = 0; i < random(min, max); i++) {
        this.result += characters.charAt(
            Math.floor(
                Math.random() * characters.length
            )
        );
    }
    return this.result;
}
