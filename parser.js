const cfg = require('./config.json')
require('colors')


console.log(`
${`======================================================

[=>]`.brightCyan.bold} ${"Image Parser".brightWhite.bold}
${"[==>]".brightCyan.bold} ${"By".bold} ${"Xaliks".zebra.bold}
${"[==>]".brightCyan.bold} ${"Discord".bgGrey.bold}: ${"Xaliks#5991".bold}
${"[==>]".brightCyan.bold} ${"VK".blue.bold}: ${"https://vk.com/xaliksss".bold}

${"======================================================".brightCyan.bold}`)

for (conf in cfg) {
    const p = cfg[conf]

    if (typeof p.enable != 'boolean') {
        throw new TypeError(`[${conf}] [Enable] Должно быть true или false`)
    }

    if (!Number(p.speed)) {
        throw new TypeError(`[${conf}] [Speed] Должно быть числом!`)
    }

    if (p.enable) require(`./sites/${conf}.js`)(p)
}
