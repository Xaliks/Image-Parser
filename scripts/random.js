/**
 * @param {Number} min Минимальное кол-во символов
 * @param {Number} max Максимальное кол-во символов
 * @param {String} characters Символы
 */
module.exports = (min, max, characters, text = "") => {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;

  for (let i = 0; i < random; i++) {
    text += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return text;
};
