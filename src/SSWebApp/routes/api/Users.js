const express = require('express');
const router = express.Router();

//Item Model
const User = require('../../models/User');

//@route GET api/items
//Get all the items
//Access public

router.get('/', (req,res) => {
    User.find()
        .then(user => res.json(user))
});

//@route POST api/items
//Create all the items
//Access public

router.post('/', (req,res) => {
    const newUser = new User({
        outcome: req.body.outcome
    });

    newUser.save().then(user => res.json(user));
});



module.exports = router;