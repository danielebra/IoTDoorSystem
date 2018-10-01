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

router.post('/addAllowCard', (req, res) => {
    const _id = "5bb1e5c76fb65398b0936dc5";
    const cardId = req.body.cardId;


    //TODO: fix this updating cards to the allow cards array
    AccessManager.findByIdAndUpdate(_id,
        { $push: { allowedCards: {$each: [cardId]} } },
        { safe: true, upsert: false },
        function (err, doc) {
            if (err) {
                res.status(500).json({ message: 'Fail to update' })
            } else {
                res.status(200).json({ message: 'update complete' })
            }
        }
    );
});

router.post('/addAvailableRoom',(req,res) => {
    const _id = "5bb1e5c76fb65398b0936dc5";
    const roomId = req.body.roomId;

    AccessManager.findByIdAndUpdate(_id,
        { $addToSet: { availableRooms: {$each: [roomId]} } },
        { safe: true, upsert: false },
        function (err, doc) {
            if (err) {
                res.status(500).json({ message: 'Fail to update' })
            } else {
                res.status(200).json({ message: 'update complete' })
            }
        }
    );
})



module.exports = router;

