const path = require('path');
const fs = require('fs');

class Json {
    #path;
    constructor(rawPath) {
        const filePath = path.isAbsolute(rawPath) ? filePath : path.join(process.cwd(), rawPath);
        const file = fs.readFileSync(filePath, 'utf8');
        Object.assign(this, JSON.parse(file || '{}'));
        this.#path = filePath;
    }

    save() {
        return fs.writeFileSync(this.#path, JSON.stringify(this, null, 2));
    }
}

module.exports = Json