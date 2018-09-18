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

router.post('/', (req,res,next) => {
    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isAdmin: req.body.isAdmin,
        card:req.body.cardId,
    });

    newUser.save().then(user => res.json(user));
});

//TODO: Fix CastError when trying to find wrong object Id

//Get each user by Id
router.get('/:userId',(req,res,next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(user => {
            if(user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({message:'No id found'})
            }
        })
        .catch(err => {
            res.status(500).json({error:err})
        });
})


//Delete each user by Id
router.delete('/:userId',(req,res,next) => {
    const id = req.params.userId;
    User.findByIdAndRemove(id)
        .exec()
        .then(user => {
            if(user) {
                res.status(200).json({message: 'User ' + id +' has been deleted'})
            } else {
                res.status(404).json({message:'No id found'})
            }
        })
        .catch(err => {
            res.status(500).json({error:err})
        });
})


module.exports = router;