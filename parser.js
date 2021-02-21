const cfg = require('./config.json')
require('colors')

console.log(`
_____                                 ______                               
|_   _|                                | ___\\                               
 | |   _ __ ___    __ _   __ _   ___  | |_/ /  __ _  _ __  ___   ___  _ __ 
 | |  | \'_ \` _ \\  / _\` | / _\` | / _ \\ |  __/  / _\` || \'__|/ __| / _ \\| '__|
_| |_ | | | | | || (_| || (_| ||  __/ | |    | (_| || |   \\__ \\|  __/| |   
\\___/ |_| |_| |_| \\__,_| \\__, | \\___| \\_|     \\__,_||_|   |___/ \\___||_|   
                          __/ |                                            
                         |___/                                             
`.brightRed)

console.log(`




_             __  __        _  _  _         
| |__   _   _  \\ \\/ /  __ _ | |(_)| | __ ___ 
| \'_ \\ | | | |  \\  /  / _\` || || || |/ // __|
| |_) || |_| |  /  \\ | (_| || || ||   < \\__ \\
|_.__/  \\__, | /_/\\_\\ \\__,_||_||_||_|\\_\\|___/
       |___/                                
`.brightCyan)

console.log(`${"[+]".green} - ${"успешно".bgGray}
${"[+]".yellow} - ${"Уже было найдено".bgGray}
${"[-]".red} - ${"Не найдено".bgGray}
`)

for(conf in cfg) {
    let p = cfg[conf]

    if(typeof p.enable != 'boolean') {
        throw new TypeError(`[${conf}] [Enable] Должно быть true или false`)
    }

    if(!Number(p.speed)) {
        throw new TypeError(`[${conf}] [Speed] Должно быть числом!`)
    }

    if(p.enable) require(`./sites/${conf}.js`)(p)
}