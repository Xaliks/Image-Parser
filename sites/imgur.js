const fetch = require("node-fetch");
const fs = require("fs");

module.exports = (config) => {
  setInterval(async () => {
    const rand = random(
      5,
      6,
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    );

    const resp = await fetch(`https://i.imgur.com/${rand}.png`, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.97 Safari/537.36 Vivaldi/1.94.1008.34",
      },
    }).catch(() => null);
    if (!resp)
      return console.log(color.yellow(`[?] https://imgur.com/${rand}`));

    const type = resp.headers.get("content-type");
    if (resp.url === "https://i.imgur.com/removed.png")
      return console.log(color.red(`[-] https://i.imgur.com/${rand}.png`));
    if (!type.startsWith("image/"))
      return console.log(color.red(`[-] ${resp.url}`));

    const url = `https://i.imgur.com/${rand}.${type.slice(6)}`;

    resp.body.pipe(
      fs.createWriteStream(`./images/${config.name}/${rand}.${type.slice(6)}`)
    );
    fs.appendFileSync("./FoundLinks.txt", url + "\n");

    console.log(color.green(`[+] ${url}`));
  }, config.speed);
};
