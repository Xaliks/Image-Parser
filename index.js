const fs = require("fs");
const { sites } = require("./config");

fs.readdirSync("./scripts").forEach((script) => {
  global[script.slice(0, -3)] = require(`./scripts/${script}`);
});

console.clear();
console.log("Image Parser by Xaliks");
console.log("");

if (process.argv[2] === "delete") {
  if (
    process.version.split(".")[0] < 14 &&
    process.version.split(".")[1] < 14
  ) {
    console.log(
      `Версия ${color.yellow("node.js")} должна быть не ниже ${color.red(
        "14.14.0"
      )}!`
    );
    process.exit();
  }

  if (!fs.existsSync("./images")) {
    console.log(`Папка ${color.cyan("images")} уже удалена!`);
  } else {
    fs.rmSync("./images", { recursive: true, force: true });
    console.log(`Папка ${color.cyan("images")} удалена!`);
  }

  if (!fs.existsSync("./FoundLinks.txt")) {
    console.log(`Файл ${color.cyan("FoundLinks.txt")} уже удалён!`);
  } else {
    fs.unlinkSync("./FoundLinks.txt");
    console.log(`Файл ${color.cyan("FoundLinks.txt")} удалён!`);
  }

  process.exit();
}

if (!fs.existsSync("./images")) {
  console.log(`Папки ${color.cyan("images")} не существует! Создаю...`);
  fs.mkdirSync("./images");
}
if (!fs.existsSync("./FoundLinks.txt")) {
  console.log(`Файла ${color.cyan("FoundLinks.txt")} не существует! Создаю...`);
  fs.writeFileSync(
    "./FoundLinks.txt",
    "Здесь будут найденные ссылки на картинки!\n"
  );
}

sites
  .filter((site) => site.enabled)
  .forEach((site) => {
    if (!fs.existsSync(`./images/${site.name}`)) {
      console.log(
        `Папки ${color.cyan(`images/${site.name}`)} не существует! Создаю...`
      );
      fs.mkdirSync(`./images/${site.name}`);
    }

    if (!fs.existsSync(`./images/${site.name}`)) {
      throw new Error(`Для сайта ${color.cyan(site.name)} нет скрипта!`);
    }

    require(`./sites/${site.name}`)(site);
  });
