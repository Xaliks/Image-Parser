require('colors');
const {
    readFileSync
} = require('fs')

module.exports = function CL(name, value, link) {
    let val = `[-]  ${name}`.brightRed.bold
    if (readFileSync('./FoundLinks.txt', 'utf8').includes(link)) val = `[+]  ${name}`.brightYellow.bold
    else if (value === '+') val = `[+]  ${name}`.brightGreen.bold

    return console.log(`${"[>]".brightCyan.bold} ${val}  ${":".brightCyan.bold} ${link}`)
}
