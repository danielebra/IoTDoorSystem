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
    let today = new Date()
    accessRequestModel.find({"roomNumber": roomNumber})
        .exec(function(err,entry) {
            let output = entry.filter(e => {
                return e.timestamp.toDateString() == today.toDateString()
            })
            res.send(output)
        })
});

router.get('/:roomNumber/yesterday', (req,res,next) => {
    const roomNumber = req.params.roomNumber
    let today = new Date()
    let yesterday = new Date(today.setDate(today.getDate() - 1))

    accessRequestModel.find({"roomNumber": roomNumber})
        .exec(function(err,entry) {
            let output = entry.filter(e => {
                return e.timestamp.toDateString() == yesterday.toDateString()
            })
            res.send(output)
        })
});
module.exports = router;
