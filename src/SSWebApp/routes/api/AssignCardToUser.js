const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const Card = require('../../models/Card');

router.post('/:cardNumber/:userNumber', (req, res) => {
    const cardNumber = req.params.cardNumber;
    const userNumber = req.params.userNumber;

    User.findOne({"userNumber": userNumber}, (err, user) => {
        Card.findOneAndUpdate({"cardNumber":cardNumber},{$set:{userId:user._id}}, (err,doc) => {
            if (err) {
                res.json({ message: 'Fail to update' })
            }
        })
    })
    
    Card.findOne({"cardNumber": cardNumber}, (err, card) => {
        User.findOneAndUpdate({"userNumber":userNumber},{$set:{cardId:card._id}}, (err,doc) => {
            if (err) {
                res.json({ message: 'Fail to update' })
            }
        })
    })

    res.json({message:'Success'})

});

module.exports = router;
