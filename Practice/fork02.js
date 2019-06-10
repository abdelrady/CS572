const http = require("http");
const {fork} = require("child_process")

const server = http.createServer();

server.on("request", (req, res) => {
    console.log(req);
    if(req.url.startsWith("/")){
        const childProcess = fork("./fork01.js");
        childProcess.send(req.url.substr(1));
        childProcess.on("message", (data)=> {
            res.writeHead(200, {"content-type": "application/json"});
            res.end(JSON.stringify({result: data}));
        })
    }
    else res.end("Not found");
});

server.listen(8080);