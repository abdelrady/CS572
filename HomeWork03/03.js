const http = require("http");
const fs = require("fs");
const config = require("./server-configs");
const { Subject } = require("rxjs");
const path = require("path");

const subject = new Subject();
const filePath = path.join(__dirname, config.filePath);

subject.subscribe(ctx => {
    if (ctx.req.url != "/sync") return;
    const fileData = fs.readFileSync(filePath);
    ctx.res.end(fileData);
})

subject.subscribe(ctx => {
    if (ctx.req.url != "/async") return;
    // fs.readFile(filePath).pipe(ctx.res);
    fs.readFile(filePath,
        (err, buffer) => err ? ctx.res.status(404).end("not found") : ctx.res.end(buffer));
})

subject.subscribe(ctx => {
    if (ctx.req.url != "/stream" && ctx.req.url != "/") return;
    const readStream = fs.createReadStream(filePath, { highWaterMark: 16 * 1024 });
    readStream.on("open", () => {
        readStream.pipe(ctx.res);
    });
    readStream.on("error", err => ctx.res.end(err));
})

app = http.createServer((req, res) => {
    subject.next({ req, res });
}).listen(config.port, ()=> console.log(`Successful Listen on port ${config.port}`));

/*
Observations:
1- Sync: will fill memory fast with the file size (~400 MB) and no more requests can be fulfilled untill first one is done
2- Async: will fill memory fast with the file size (~400 MB) but requests can be accepted until I/O read operation is ready to handle old requests
3- Stream: I found that memory won't exceed 18MB which will make server more efficient to handle lots of requests in a non-blocking way 

*/