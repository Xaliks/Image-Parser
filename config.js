module.exports = {
  sites: [
    {
      enabled: true,
      name: "Imgur", // Имя сервиса
      baseUrl: "https://i.imgur.com/", // Домен ссылки на картинку (Не изменяйте, если не знаете, что делаете)
      speed: 100, // Скорость запросов в миллисекундах
      min: 5, // Минимальное количество символов
      max: 6, // Максимальное количество символов
      characters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", // Символы
    },
    {
      enabled: true,
      name: "PasteNow",
      baseUrl: "https://i.paste.pics/",
      speed: 50,
      min: 4,
      max: 5,
      characters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    }
  ],
};
