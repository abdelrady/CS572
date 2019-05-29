const { resolve4: findIp } = require("dns");

const resolveIp = (hostUrl) => new Promise((resolve, reject) =>
    findIp(hostUrl, null, (err, ipList) => {
        if (err) reject(err);
        resolve(ipList);
    }));

resolveIp("www.mum.edu")
    .then(console.log)
    .catch(console.log);