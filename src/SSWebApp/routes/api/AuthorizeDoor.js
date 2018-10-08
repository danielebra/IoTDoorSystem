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
    const roomNumber = req.params.roomNumber; // Currently find room by Id\
	const cardNumber = req.params.cardNumber;
    

    let newAccessRequest = new AccessRequest({
        timestamp: Date.now(),
        outcome: 'Access Denied',
        roomNumber: req.params.roomNumber,
        cardNumber: req.params.cardNumber
        
        
    })

	AccessManager.findOne( {roomNumber: roomNumber} , function(err,result) {
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
        let status = +result.allowedCards.some(card => {
            if(card.cardNumber == cardNumber) {
                newAccessRequest.outcome = 'Access Granted'
                return true
            }
        })
        
        newAccessRequest.save((err)=>{
                //Only need to handle error here. Unless you need the AccessRequest _id for some reason.
            if(err) console.log(err)
            console.log('helo')
            res.send(String(status));
        })
    })
        //         let outcome = result.allowedCards.filter(card => {
        //             if(card.cardNumber == cardNumber) {
        //                 newAccessRequest.outcome = 'Access Granted'
        //                 console.log(JSON.stringify(newAccessRequest));
        //                 console.log('access granted');
        //                 res.send(1);
        //             } else {
        //                 newAccessRequest.outcome = 'Access denided'
        //                 console.log('access denided');
        //                 res.send(0);
        //             }
        //         })
        //     })
        // .then(newAccessRequest.save().then(request => res.json(request)))
        
})


module.exports = router;    