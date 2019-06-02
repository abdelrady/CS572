const express = require("express");
const logger = require("morgan")
const cors = require("cors");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");

const grades = require("./gardes-routes");

const logFileStream = fs.createWriteStream(path.join(__dirname, "access.log"), {encoding: "utf8"});
const app = express();

app
    .use(cors())
    .use(logger("common", {stream: logFileStream}))
    .use(helmet())
    .use(express.json())
app
    .post("*", (req, res, next)=>{
        try{
            JSON.parse(JSON.stringify(req.body));
            next();
        }
        catch(err){
            res.status(506).send("Invalid JSON body received!");
        }
    })

app.use(grades);
app.get("/", (req, res, next)=>res.redirect("/grades"));

app.listen(8080, ()=>console.log("Listening on 8080."))