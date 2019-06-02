const express = require("express");
const { from } = require("rxjs");
const { shareReplay } = require("rxjs/operators");
const axios = require("axios");
const url = require('url');

const app = express();
let cnt = 0;
const apiUrl = "https://randomuser.me/api/?results=10&page=";
//const apiUrl = "http://127.0.0.1:8091/test";

app.disable("x-powered-by");
app.enable("strict routing");
app.enable("case sensitive routing");

const getFullUrl = function (req, query) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl,
    query: query
  });
}

app.get("/users/:page", (req, res) => {
    const pageIndex = parseInt(req.query.page || req.params.page || 0);
    from(axios.get(apiUrl + pageIndex)).pipe(shareReplay(1))
    .subscribe(apiRes=>{
        // const links = `<${getFullUrl(req, {page: 0})}>; rel="first",\n<${getFullUrl(req, {page: parseInt(req.query.page || 0) + 1})}>; rel="next"`;
        // console.log(links);
        res
            .set('Cache-Control', 'private, max-age=86400')
            .set("Link", `<${getFullUrl(req, {page: pageIndex + 1})}>; rel="next"`)
            // .set('Link', links);
            .json(apiRes.data);
    })
});

app.get("/test", (req, res) => {
    console.log(`id param= ${req.query.ID}, count = ${cnt}`);
    cnt++;
    res.json({executionCount: cnt})
});

app.listen(8091, () => console.log("Server Started Successfully."))
