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

module.exports = router;
