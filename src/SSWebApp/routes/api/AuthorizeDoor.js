const express = require('express');
const router = express.Router();


router.get('/:card/:room', (req,res) => {
	var d = new Date();
	var n = d.toLocaleTimeString();
	console.log("[" + n + "]" + " Authorization request received")
	if (req.params.card == "729")
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