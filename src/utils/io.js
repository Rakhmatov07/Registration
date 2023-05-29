const fs = require("fs").promises;

class IO {
    #path;
    constructor(path){
        this.#path = path;
    }

    async read() {
        const users = await fs.readFile(this.#path, "utf-8");
        return users ? JSON.parse(users) : [];
    }

    async write(data) {
        await fs.writeFile(this.#path, JSON.stringify(data, null, 2));
    }
}

module.exports = IO;