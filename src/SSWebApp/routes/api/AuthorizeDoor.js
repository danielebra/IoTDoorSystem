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