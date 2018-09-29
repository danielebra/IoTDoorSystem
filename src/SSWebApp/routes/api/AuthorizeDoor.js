const express = require('express');
const router = express.Router();


router.get('/:card/:room', (req,res) => {
	var d = new Date();
	var n = d.toLocaleTimeString();
	console.log("[" + n + "]" + " Authorization request received")
	// We need to log the request
	// We need to request access
	// Input: card number, room number
	// Output: 0, 1 // Denied, Granted
	if (req.params.card == "729") //should be access request
	{
		console.log("\t\tAccess granted");
		res.send("1");
	}
	else
	{
		console.log("\t\tAccess denied");
		res.send("0");
	}
});


module.exports = router;