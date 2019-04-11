const express = require('express');
const router = express.Router();

const { projects } = require("../data.json");

router.get("/:id", (req, res) => {
    const id = req.params.id;
    res.render('project', {
        project: getProjectById(id),
    });
});

const getProjectById = id => {
    for(let project in projects){
        const p = projects[project];
        if(p.id == id){
            return p;
        }else continue;
    }

    return null;
}

module.exports = router;