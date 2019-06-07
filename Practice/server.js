const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const mongClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: true});
const app = express();

let db = null;
const carsRoutes = require("./routes");

app
.use(express.json())
.use(async (req, res, next)=>{
    if(!db){
        await mongClient.connect();
        db = mongClient.db("practice").collection("cars");
    }
    req.db = db;
    next();
})

app.use('/cars', carsRoutes)

app.listen(8080);