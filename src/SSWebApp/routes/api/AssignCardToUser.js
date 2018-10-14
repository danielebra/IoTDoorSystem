const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const Card = require('../../models/Card');

router.post('/:cardNumber/:userNumber', (req, res) => {
    const cardNumber = req.params.cardNumber;
    const userNumber = req.params.userNumber;

    User.findOne({ "userNumber": userNumber }, (err, user) => {
        if (err) {
            if (err.errors.userNumber) {
                res.json({ sucess: false, message: err.errors.userNumber.message });
            }
        }
        if (user) {
            Card.findOneAndUpdate({ "cardNumber": cardNumber }, { $set: { userId: user._id } }, (err, card) => {
                if (err) {
                    if (err.errors.cardNumber) {
                        res.json({ sucess: false, message: err.errors.userNumber.message });
                    }
                }
                if (card) {
                    User.findOneAndUpdate({ "userNumber": userNumber }, { $set: { cardId: card._id } }, (err, user) => {
                        if (err) {
                            if (err.errors.userNumber) {
                                res.json({ success: false, message: err.errors.cardNumber.message })
                            }
                        }
                        if (user) {
                            res.json({ success: true, message: 'User is added to card' })
                        }
                        else {
                            res.json({ success: false, message: 'No User Number Found' })
                        }
                    })
                }
                else {
                    res.json({ success: false, message: 'No Card Number Found' })
                }
            })
        }

        else {
            res.json('No User Number Found')
        }
    })

});

module.exports = router;
