const fs = require("fs"),
    commitHash = require("child_process")
        .execSync("git rev-parse --short HEAD")
        .toString()
        .trim();

/**
 * This section save current git hash in file conf.json
 * @type {Buffer}
 */
let fileConfig = fs.readFileSync("./App/conf.json"),
    config = JSON.parse(fileConfig);
config.version.gitHash = commitHash;

let data = JSON.stringify(config);
fs.writeFileSync("./App/conf.json", data);
