const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const accessRequestModel = require('../../models/AccessRequest');

/*
Define the 3 paths you want to support and reuse the same function

With Query Params

app.get('/articles', function(req, res) {
  var year = req.query.year; //either a value or undefined
  var month = req.query.month;
  var day = req.query.day;
}

The url for this endpoint will look like this:

http://localhost/articles?year=2016&month=1&day=19
*/

router.get('/', (req,res,next) => {
    const roomNumber = req.query.roomNumber
    const cardNumber = req.query.cardNumber
    //TODO make functions to get dates
    const startDate = new Date(req.query.startDate)
    const endDate = new Date(req.query.endDate)
    const outcome = req.query.outcome
    accessRequestModel.find()
        .exec(function(err,entry) {
            if (cardNumber != undefined){
                entry = entry.filter(e =>{
                    return e.cardNumber == cardNumber
                })
            }
            if (roomNumber != undefined){
                entry = entry.filter( e=>{
                    return e.roomNumber == roomNumber
                })
            }
            if (startDate != undefined){
                entry = entry.filter(e =>{
                    return e.timestamp >= startDate
                })
            }
            if (endDate != undefined){
                entry = entry.filter(e =>{
                    return e.timestamp <= endDate
                })
            }
            if (outcome != undefined){
                entry = entry.filter(e =>{
                    return e.outcome <= outcome
                })
            }
            res.send(entry)
        })
});

module.exports = router;
