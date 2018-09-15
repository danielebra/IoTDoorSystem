const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    newUser.save().then(user => res.json(user));
});

//Get each user by Id
router.get('/:userId',(req,res,next) => {
    const id = req.params.userId;
    User.findById(id, (err,User).then(user => res.json(user)))
})

//Delete each user by Id
router.delete('/:userId',(req,res,next) => {
    const id = req.params.userId;
    User.findByIdAndRemove(id, (err,User)
        .then(user => res.json({message: 'User ' + id +' has been deleted'})))
})


module.exports = router;