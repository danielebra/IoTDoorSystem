const express = require('express');
const router = express.Router();

//Item Model
const Card = require('../../models/Card');

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
        cardNumber: req.body.cardNumber,
        status: req.body.status
    });

    newCard.save().then(card => res.json(card));
});

//TODO: Use Card.findOne() and populate the data
//




module.exports = router;