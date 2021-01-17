const cfg = require('./config.json')

for(conf in cfg) {
    let p = cfg[conf]

    if(typeof p.enable != 'boolean') {
        throw new TypeError(`[${conf}] Enable Должно быть true или false`)
    }

    if(p.enable) require('./sites/' + conf)(p)
}