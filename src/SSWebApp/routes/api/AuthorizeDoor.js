const express = require('express');
const router = express.Router();

const AccessManager = require('../../models/AccessManager');
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

router.get('/:roomNumber/:cardNumber', (req,res) => {
	const cardNumber = req.params.cardNumber;
	const roomNumber = req.params.roomNumber;

	AccessManager.findOne({"roomId": roomNumber }, function(err,result) {
        if (err) {
            res.json(err)
        } 
        if (result) {}
        else {
            res.json('not found');
        }
    })
    .populate("allowedCards")
    .then(r => {
                let outcome = r.allowedCards.filter(card => {
                    return card.cardNumber == cardNumber
                })
                res.json(outcome)
            })
})

module.exports = router;