const express = require('express');
const router = express.Router();


router.get('/:card/:room', (req,res) => {
	console.log("Authorization request received")
	if (req.params.card == "729")
	{
		console.log("\tAccess granted");
		res.send("1");
	}
	else
	{
		console.log("\tAccess denied");
		res.send("0");
	}
});


module.exports = router;