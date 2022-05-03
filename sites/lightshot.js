const cheerio = require("cheerio");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports = (config) => {
  setInterval(async () => {
    const rand = random(5, 8, "abcdefghijklmnopqrstuvwxyz1234567890");

    const resp = await fetch(`https://prnt.sc/${rand}`, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.97 Safari/537.36 Vivaldi/1.94.1008.34",
      },
    }).catch(() => null);
    if (!resp) return console.log(color.yellow(`[?] ${resp.url}`));
    if (resp.url === "https://prnt.sc/")
      return console.log(color.red(`[-] https://prnt.sc/${rand}`));

    const body = await resp.text();
    const $ = cheerio.load(body);
    const img = $("img").attr("src");

    if (img.startsWith("//st.prntscr.com"))
      return console.log(color.red(`[-] ${resp.url}`));

    fetch(img, { redirect: "follow" }).then((res) => {
      if (res.url === "https://i.imgur.com/removed.png")
        return console.log(color.red(`[-] ${resp.url}`));

      res.body.pipe(
        fs.createWriteStream(
          `./images/${config.name}/${resp.url.slice(16)}.png`
        )
      );
      fs.appendFileSync("./FoundLinks.txt", resp.url + "\n");

      console.log(color.green(`[+] ${resp.url}`));
    });
  }, config.speed);
};
