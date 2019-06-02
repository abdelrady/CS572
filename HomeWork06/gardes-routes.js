const express = require("express");
const router = express.Router();

const path = "/grades";

const grades = [{id: 1, name: "Asaad Saad", course: "CS572", grade: 95}];

router.get(path, (req, res, next) => {
    res.json(grades);
});

router.get(`${path}/:id`, (req, res, next) => {
    const grade = grades.filter(g=>g.id==req.params.id)[0];
    if(grade)res.json(grade);
    else res.send(404, "Grade not found!");
});

router.post(path, (req, res, next) => {
    grades.push(req.body);
    res.status(201).end();
});


router.delete(`${path}/:id`, (req, res, next) => {
    const gradeIndex = grades.map(g=>g.id==req.params.id).indexOf(true);
    if(gradeIndex >= 0){
        grades.splice(gradeIndex, 1);
        res.status(200).end();
    }
    else res.send(404, "Grade not found!");
});

module.exports = router;