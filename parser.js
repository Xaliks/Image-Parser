const cfg = require('./config.json')
const notFound = require('./scripts/jsonArray');
require('colors')


console.log(`
${`======================================================

[=>]`.brightCyan.bold} ${"Image Parser".brightWhite.bold}
${"[==>]".brightCyan.bold} ${"By".bold} ${"Xaliks".zebra.bold}
${"[==>]".brightCyan.bold} ${"Discord".bgGrey.bold}: ${"Xaliks#5991".bold}
${"[==>]".brightCyan.bold} ${"VK".blue.bold}: ${"https://vk.com/xaliksss".bold}

${"======================================================".brightCyan.bold}`)

for(conf in cfg) {
    if (!notFound[conf]) {
        notFound[conf] = []
        notFound.save()
    }
    this.p = cfg[conf]

    if(typeof this.p.enable != 'boolean') {
        throw new TypeError(`[${conf}] [Enable] Должно быть true или false`)
    }

    if(!Number(this.p.speed)) {
        throw new TypeError(`[${conf}] [Speed] Должно быть числом!`)
    }

    if(this.p.enable) require(`./sites/${conf}.js`)(this.p)
}