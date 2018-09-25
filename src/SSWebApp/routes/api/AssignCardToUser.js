const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const Card = require('../../models/Card');

router.put('/', (req,res) => {
    const cardId = req.body.cardId;
    const userId = req.body.userId;

    Card.findById(cardId, (err, user) => {
        Card.addUser(userId, function(err) {
            if(err) {
                return res.status(500).json({ success:true, msg: 'Fail to add user to card'})
            } else {
                return res.status(200).json({ success:true, msg: 'User is added to the card'})
            }
        })
        
    })
    
    User.findById(userId, (err, card) => {
        User.addCard(cardId, function(err) {
            if(err) {
                return res.status(500).json({ success:true, msg: 'Fail to add card to user'})
            } else {
                return res.status(200).json({ success:true, msg: 'Card is added to the user'})
            }
        })
        
    })

});


module.exports = router;
