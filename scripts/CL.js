require('colors');

function CL(name, value, link) {
    const val = value === '-' ? `[-]  ${name}`.brightRed.bold : `[+]  ${name}`.brightGreen.bold

    return console.log(`${"[>]".brightCyan.bold} ${val}  ${":".brightCyan.bold} ${link}`)
}

module.exports = CL