const express = require('express');
const router = express.Router();

const AccessManager = require('../../models/AccessManager');
const AccessRequest = require('../../models/AccessRequest');
const Room = require('../../models/Room');

router.get('/:roomName/:cardNumber', (req,res) => {
    const roomName = req.params.roomName; // Currently find room by Id\
	const cardNumber = req.params.cardNumber;

    
    let newAccessRequest = new AccessRequest({
        timestamp: Date.now(),
        outcome: 'Access Denied',
        roomName: req.params.roomName,
        cardNumber: req.params.cardNumber
    })

	AccessManager.findOne( {roomName: roomName} , function(err,result) {
        if (err) {
            console.log('hit the error statement')
            res.json(err)
        } 
        if (result) {}
        else {
            console.log('hit the else statement')
            res.send('0')
        }
        
    })
    .populate("allowedCards")
    .then(result => {
        let status = result.allowedCards.some(card => {
            if(card.cardNumber == cardNumber && card.isActive == true) {
                newAccessRequest.outcome = 'Access Granted'
                return true
            }
        })
        newAccessRequest.save((err)=>{
                //Only need to handle error here. Unless you need the AccessRequest _id for some reason.
            if(err) console.log(err)
            console.log(status)
            if (status)
                res.send('1')
            else
                res.send('0')
        })
    })
})

module.exports = router;    