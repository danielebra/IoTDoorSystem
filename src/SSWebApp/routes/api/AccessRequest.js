const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const accessRequestModel = require('../../models/AccessRequest');


router.get('/', (req,res,next) => {
    accessRequestModel.find()
        .exec(function(err,entry) {
            res.send(entry)
        })
});

router.get('/:roomNumber/today', (req,res,next) => {
    const roomNumber = req.params.roomNumber
    // Force everything to Sydney time because the server is in America...
    let today = new Date(Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"}))

    accessRequestModel.find({"roomNumber": roomNumber}).lean()
        .exec(function(err,entry) {
            let output = entry.filter(e => {

                let comparison = new Date(Date(e.timestamp).toLocaleString("en-US", {timeZone: "Australia/Sydney"}))
                // Something weird might be going on here... requires investigation
                console.log(e.timestamp)
                console.log("Todays date: " + today.toDateString() + " being checked against: " + comparison.toDateString())
                return comparison.toDateString() == today.toDateString()
            })
            res.send(output)
        })
});

router.get('/:roomNumber/yesterday', (req,res,next) => {
    const roomNumber = req.params.roomNumber
    // Force everything to Sydney time because the server is in America...
    let today = new Date(Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"}))
    let yesterday = new Date(today.setDate(today.getDate() - 1))

    accessRequestModel.find({"roomNumber": roomNumber}).lean()
        .exec(function(err,entry) {
            let output = entry.filter(e => {

                let comparison = new Date(Date(e.timestamp).toLocaleString("en-US", {timeZone: "Australia/Sydney"}))
                return comparison.toDateString() == yesterday.toDateString()
            })
            res.send(output)
        })
});
module.exports = router;
