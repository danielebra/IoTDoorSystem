const express = require('express');
const router = express.Router();

const AccessManager = require('../../models/AccessManager');
const AccessRequest = require('../../models/AccessRequest');
const Room = require('../../models/Room');

// router.get('/:card/:room', (req,res) => {
// 	var d = new Date();
// 	var n = d.toLocaleTimeString();
// 	console.log("[" + n + "]" + " Authorization request received")
// 	// We need to log the request
// 	// We need to request access
// 	// Input: card number, room number
// 	// Output: 0, 1 // Denied, Granted
// 	if (req.params.card == "729") //should be access request
// 	{
// 		console.log("\t\tAccess granted");
// 		res.send("1");
// 	}
// 	else
// 	{
// 		console.log("\t\tAccess denied");
// 		res.send("0");
// 	}
// });

router.post('/:roomNumber/:cardNumber', (req,res) => {
	const cardNumber = req.params.cardNumber;
    const roomNumber = req.params.roomNumber; // Currently find room by Id\

    const newAccessRequest = new AccessRequest({
        timestamp: Date.now(),
        outcome: 'asdf',
        roomNumber: req.params.cardNumber,
        cardNumber: req.params.roomNumber
    })

	AccessManager.findOne( {availableRooms:roomNumber} , function(err,result) {
        if (err) {
            res.json(err)
        } 
        if (result) {}
        else {
            res.json('not found');
        }
        
    })
    .populate("allowedCards")
    .then(result => {
                let outcome = result.allowedCards.filter(card => {
                    return card.cardNumber == cardNumber
                })

                if (outcome == true) {
                    res.json('"\t\tAccess granted')
                    AccessRequest.outcome = 'Access Granted'
                    console.log('access granted');
                    // newAccessRequest.save();
                    res.send(1);
                    
                }
                
                else {
                    // res.json("\t\tAccess denied")
                    newAccessRequest.save().then(request => res.json(request));
                    AccessRequest.outcome = 'Access denided'
                    console.log('access denided');
                    // newAccessRequest.save();
                    res.send(0);
                    

                }
            })
        newAccessRequest.save().then(request => res.json(request));
})


module.exports = router;    