const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Item Model
const User = require('../../models/User');

//@route GET api/items
//Get all the items
//Access public

router.get('/', (req,res,next) => {
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
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress,
        isAdmin: req.body.isAdmin,
        cardId: req.body.cardId,
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

//Change the information of the user
// router.patch(':/userId',(req,res,next) => {
//     var update = JSON.parse(req.body.User);
//     const id = req.params.userId;
//     User.findByIdAndUpdate(id, update, function(err, user) {
//         if(err) {
//             res.status(500).send(user);
//         }
//         res.status(200).send(user);
//     })      
// });

router.patch('/:userId', function (req, res) {
    const id = req.params.userId;
    const input = req.body;

    const updateOps = {};
    for (const key of Object.keys(input)) {
        updateOps[key] = req.body[key];
    }
    User.findOneAndUpdate({ _id: id }, { $set: updateOps })
        .exec()
        .then(user => {
        res.status(200).json({message: 'User ' + id +' has been updated'})
        })
        .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

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