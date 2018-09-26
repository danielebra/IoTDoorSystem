const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const AccessManager = require('../../models/AccessManager');

router.get('/', (req,res) => {
    AccessManager.find()
        .then(accessManager => res.json(accessManager))
});

router.post('/', (req,res) => {
    const newAccessManager = new AccessManager({
        _id: new mongoose.Types.ObjectId(),
        allowedCards: req.body.cardId,
        roomId: req.body.roomId
    });
    newAccessManager.save().then(accessManager => res.json(accessManager));
});

router.put('/:id',(req,res) => {
        // const accessManagerId = req.body.accessManagerId;
        const allowedCards = req.body.cardId;

        AccessManager.findById(req.params.body, (err, accessManager) => {
            AccessManager.push(allowedCards, function(err) {
                if(err) {
                    return res.status(500).json({ success:true, msg: 'Fail to add user to card'})
                } else {
                    return res.status(200).json({ success:true, msg: 'New Allowed card is added'})
                }
            })
            
        })
})

module.exports = router;

