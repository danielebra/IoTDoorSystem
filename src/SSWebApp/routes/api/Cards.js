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
        .populate("userId")
        .then(result => res.json(result))
});

//@route POST api/items
//Create all the items
//Access public

router.post('/create/:cardNumber', (req,res) => {
    const cardNumberParam = req.params.cardNumber
    const newCard = new Card({
        _id: mongoose.Types.ObjectId(),
        cardNumber: cardNumberParam, //req.body.cardNumber,
        isActive: false//req.body.status,
        //userId: //req.body.userId,
    });
    
    newCard
        .save()
        .then(card => {
            res.json(card)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
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
    Card.findById(id)
        .exec()
        .then(card => {
            if(card) {
                res.status(200).json(card);
            } else {
                res.status(404).json({message:'No id found'})
            }
        })
        .catch(err => {
            res.status(500).json({error:err})
        });
})

router.get('/findCardByNumber/:cardNumber',(req,res,next) => {
    const cardNumber = req.params.cardNumber;

    Card.findOne({"cardNumber":cardNumber}, (err,result) => {
        if(err) {
            res.status(500).json(err)
        } if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json(message,"not found")
        }
    })
})

router.get('/blockCard/:cardNumber', (req,res,next) => {
    const cardNumber = req.params.cardNumber;
    Card.findOneAndUpdate({"cardNumber": cardNumber}, {isActive: false}, (err,result) => {
        if(err) {
            res.status(500).json(err)
        } 
        else {
            res.status(200).json("Card Number " + cardNumber + " has been blocked")
        }
    })
})

router.get('/unblockCard/:cardNumber', (req,res,next) => {
    const cardNumber = req.params.cardNumber;
    Card.findOneAndUpdate({"cardNumber": cardNumber}, {isActive: true}, {upsert:true}, (err,result) => {
        if(err) {
            res.status(500).json('Error Found')
        } 
        else {
            res.status(200).json("Card Number " + cardNumber + " is now active")
            
        }
    })
})

//TODO: show card infomation
router.get('/cardNumber/:cardNumber', (req,res,next) => {
    const cardNumber = req.param.cardNumber;
    Card.getCardByNumber(cardNumber, (err) => {
        if(err) {
            res.status(500).json({message: 'No card found'});
        } else {
            res.status(200).json(cardNumber);
        }
    })
})

//Delete Card by Id
router.get('/deleteCard/:cardNumber',(req,res,next) => {
    const cardNumber = req.params.cardNumber;
    Card.findOneAndRemove({"cardNumber":cardNumber})
        .exec()
        .then(card => {
            if(card) {
                res.status(200).json({message: 'Card ' + cardNumber +' has been deleted'})
            } else {
                res.status(404).json({message:'No card found'})
            }
        })
        .catch(err => {
            res.status(500).json({error:err})
        });
})
//TODO: Use router.patch
//When we wanted to change the card status to false

module.exports = router;