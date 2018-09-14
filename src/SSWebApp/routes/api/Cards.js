const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Item Model
const Card = require('../../models/Card')

//@route GET api/items
//Get all the items
//Access public

router.get('/', (req,res) => {
    Card.find()
        .then(card => res.json(card))
});

//@route POST api/items
//Create all the items
//Access public

router.post('/', (req,res) => {
    const newCard = new Card({
        // _id: new mongoose.Type.ObjectId(),
        cardNumber: req.body.cardNumber,
        status: req.body.status
    });
    
    newCard.save().then(card => res.json(card));
});

// TODO: Use Card.findOne() and populate the data
//
router.get('/', (req,res) => {
    Card.find("")
    exec(function (err, cards) {
            if(err) return handleError(err);
            console.log('The cards are an array: ', cards);
    });
})

//Get each card by Id
router.get('/:cardId',(req,res,next) => {
    const id = req.params.cardId;
    Card.findById(id, (err,Card) => {
        if (err) {
            res.status(200).json({message:'Card cannot be found'})
        }
    }).then(card => res.json(card))
})



module.exports = router;