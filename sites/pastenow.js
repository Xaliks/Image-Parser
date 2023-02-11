const fetch = require("node-fetch");
const fs = require("fs");

module.exports = async (config) => {
	await start(config)
};

async function start(config) {
	const rand = random(config.min, config.max, config.characters);

	const resp = await fetch(`${config.baseUrl}${rand}.png`, {
		redirect: "follow",
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.97 Safari/537.36 Vivaldi/1.94.1008.34",
		},
	}).catch(() => null);
	if (resp) {
		if (resp.status === 200) {
			await new Promise((resolve) => {
				const fileStream = fs.createWriteStream(`./images/${config.name}/${resp.url.slice(config.baseUrl.length)}`);

				resp.body.pipe(fileStream);
				resp.body.on("error", resolve);
				fileStream.on("finish", () => {
					fs.appendFileSync("./FoundLinks.txt", resp.url + "\n");

					console.log(color.green(`[+] ${resp.url}`));

					resolve();
				});
			});
		} else console.log(color.red(`[-] ${resp.url}`));
	} else console.log(color.yellow(`[?] ${config.baseUrl}${rand}`));

	await sleep(config.speed);
	return start(config);
}
