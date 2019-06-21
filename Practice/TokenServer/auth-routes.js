const express = require("express");
const fs = require("fs");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const saltRounds = 10;
//http://travistidwell.com/jsencrypt/demo/
let privateKey = fs.readFileSync("keys-private.config", 'utf8');
let publicKey = fs.readFileSync('keys-public.config');

const router = express.Router();

const authMiddlerWare = (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1];
    console.log(token);
    jwt.verify(token, publicKey, function (err, decoded) {
        if (err) res.status(401).send();
        console.log(decoded)
        req.userEmail = decoded.email;
        next();
    });
}
router.get("/protected", authMiddlerWare, (req, res, next) => {
    res.json({ success: true });
});

router.post("/signup", async (req, res, next) => {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hash;
    delete req.body.confirmpassword;
    await req.db.save(req.body);
    res.status(201).end();
});


router.post("/login", async (req, res, next) => {
    let user = await req.db.findOne({ "userData.email": req.body.email });
    if (user) {
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) res.json({ success: false });

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
            res.json({ success: true, token: token });
        });
    } else {
        res.json({ success: false });
    }

});

module.exports = router;