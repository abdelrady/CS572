const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient("mongodb://localhost:27017", { useNewUrlParser: true });

const app = express();
let db = null;
let mumLocation = {longitude: -91.9665342, latitude: 41.017654};

app
    .use(cors())
    .use(express.json())
    .use(async (req, res, next) => {
        if (!db) {
            await client.connect()
            db = client.db("homework08");
        }
        req.db = db;
        next();
    })

// app.get("/", (req, res, next) => res.redirect("/grades"));
app.post('/locations/add', async (req, res, next)=>{
    const collection = req.db.collection("surroundings");
    if(Array.isArray(req.body)){
        req.body.forEach(async (loc)=> await collection.save(loc));
    }
    else await collection.save(req.body);
    res.status(200).end();
})

app.get('/locations/find/:category/:name?', async (req, res, next)=>{
    try{
        let criteria = {'location': {$near: [mumLocation.longitude, mumLocation.latitude]}, 'category': req.params.category};
        if(req.params.name) criteria['name'] = {$regex: `.*${req.params.name}.*`};
        const locations = await req.db.collection("surroundings")
        .find(criteria)
        // .find({location: {$near: [-91.9665342, 41.017654]}})
        .limit(3)
        .toArray();
    
        res.json(locations);
    }catch (err){
        next(err);
    }
});

app.get("*", (err, req, res, next) => {
    res.json(err);
});

app.listen(8080, () => console.log("Listening on 8080."));