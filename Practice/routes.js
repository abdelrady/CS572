const router = require("express").Router();
const mongo = require("mongodb");

router.get("/", async (req, res, next)=> {
    const result = await req.db.find({})
    .project({model: 1, version: 1, plate: 1, status: 1, _id: 0})
    .toArray();
    res.json(result);
})


router.post("/:id/reserve", async(req, res, next)=>{
    console.log(req.params.id);
    const car = await req.db.findOne({"_id": parseInt(req.params.id)}, {projection: {rental_details: 1}});
    console.log(car);
    const lastMilage = car.rental_details[car.rental_details.length -1].end_mileage || 0;
    const rid = new mongo.ObjectID();
    //req.body.start_mileage = lastMilage;
    await req.db.updateOne({_id: parseInt(req.params.id)}, {$push: {"rental_details": {...req.body, start_mileage: lastMilage, reservation_id: rid}}});
    res.json({success: 1, reservation_id: rid});
})

router.patch("/:id/reserve/:reservation_id", async (req, res, next)=>{
    const car = await req.db.findOne({_id: parseInt(req.params.id)});
    const total = car.rate_per_day * req.body.number_of_days;
    await req.db.updateOne({_id: parseInt(req.params.id), "rental_details.reservation_id": new mongo.ObjectID(req.params.reservation_id)}, 
    {$set: {"rental_details.$.end_mileage": req.body.end_mileage, "rental_details.$.rental_price": total }});
    res.json({success: 1, total_rent: total});
});

router.delete("/:id/reserve/:reservation_id", async (req, res, next)=>{
    await req.db.updateOne({_id: parseInt(req.params.id)}, {$pull: {rental_details: {reservation_id: new mongo.ObjectID(req.params.reservation_id)}}});
    // await req.db.updateOne({_id: parseInt(req.params.id)}, {$pop: {"rental_details": 1}});
    res.json({success: 1});
})






module.exports = router;