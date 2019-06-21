const express = require("express");
const logger = require("morgan")
const cors = require("cors");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient("mongodb://localhost:27017", { useNewUrlParser: true });

const auth = require("./auth-routes");

const logFileStream = fs.createWriteStream(path.join(__dirname, "access.log"), { encoding: "utf8" });
const app = express();
let db = null;

app
    .use(cors())
    .use(logger("common", { stream: logFileStream }))
    .use(helmet())
    .use(express.json())
    .use(express.urlencoded())
    .use(async (req, res, next) => {
        if (!db) {
            await client.connect()
            db = client.db("homework14").collection("users");
        }
        req.db = db;
        next();
    })

app.use("/api", auth);

app.listen(8080, () => console.log("Listening on 8080."))

