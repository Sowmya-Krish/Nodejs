const os = require("os");
console.log("Free memory", os.freemem() / 1024 / 1024 / 1024);
console.log("Free memory", os.freemem() / 1024 / 1024 / 1024);
console.log("Version", os.version());
console.log("CPU", os.cpus());
