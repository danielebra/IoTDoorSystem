const express = require('express');
const router = express.Router();

//Item Model
const DoorHistory = require('../../models/DoorHistory');

//@route GET api/items
//Get all the items
//Access public

router.get('/', (req,res) => {
    DoorHistory.find()
        .sort({date: -1})
        .then(DoorHistories => res.json(DoorHistories))
});

//@route POST api/items
//Create all the items
//Access public

router.post('/', (req,res) => {
    const newDoorHistory = new DoorHistory({
        outcome: req.body.outcome
    });

    newDoorHistory.save().then(doorHistory => res.json(doorHistory));
});



module.exports = router;