const express = require("express");
const fs = require("fs");
var jwt = require('jsonwebtoken');
let privateKey = fs.readFileSync("keys-private.config", 'utf8');

const router = express.Router();

router.get("/protected", async (req, res, next) => {
    res.json({ success: true });
});

router.post("/signup", async (req, res, next) => {
    await req.db.save(req.body);
    res.status(201).end();
});


router.post("/login", async (req, res, next) => {
    let user = await req.db.findOne({ "userData.email": req.body.email, "password": req.body.password });
    if (user) {
        var i = 'Rady corp';          // Issuer 
        var s = 'atantawy@mum.edu';        // Subject 
        var a = 'http://rady.in'; // Audience
        var signOptions = {
            issuer: i,
            subject: s,
            audience: a,
            expiresIn: "12h",
            algorithm: "RS256"
        };
        console.log(user.userData);
        console.log(privateKey);
        jwt.sign(user.userData, privateKey, signOptions, function (err, token) {
            console.log(err);
            console.log(token);
            res.json({success: true, token: token});
        });
    } else {
        res.json({success: false});
    }
});

module.exports = router;