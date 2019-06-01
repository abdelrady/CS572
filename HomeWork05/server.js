const express = require("express");
const { from } = require("rxjs");
const { shareReplay } = require("rxjs/operators");
const axios = require("axios");

const app = express();
let cnt = 0;
const apiUrl = "https://randomuser.me/api/?results=10";
//const apiUrl = "http://127.0.0.1:8091/test";

app.set("X-Powered-By", false);

app.get("/", (req, res) => {
    from(axios.get(apiUrl)).pipe(shareReplay(1))
    .subscribe(apiRes=>{
        res.json(apiRes.data);
    });
});

app.get("/test", (req, res) => {
    console.log(`id param= ${req.query.ID}, count = ${cnt}`);
    cnt++;
    res.json({executionCount: cnt})
});
app.listen(8091, () => console.log("Server Started Successfully."))
