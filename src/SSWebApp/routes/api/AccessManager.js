const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const AccessManager = require('../../models/AccessManager');

router.get('/', (req,res) => {
    AccessManager.find()
        .then(accessManager => res.json(accessManager))
});

router.get('/:accessManagerId',(req,res,next) => {
    const id = req.params.accessManagerId;
    AccessManager.findById(id)
        .then(accessManager => {
            if(accessManager) {
                res.status(200).json(accessManager);
            } else {
                res.status(404).json({message:'No id found'})
            }
        })
        .catch(err => {
            res.status(500).json({error:err})
        });
})

router.post('/', (req,res) => {
    const newAccessManager = new AccessManager({
        _id: new mongoose.Types.ObjectId(),
        allowedCards: req.body.cardId,
        roomNumber: req.body.roomNumber
    });
    newAccessManager.save().then(accessManager => res.json(accessManager));
});

router.post('/addAllowCard/:accessManagerId', (req, res) => {
    const accessManagerId = req.params.accessManagerId;
    const cardId = req.body.cardId;


    //TODO: fix this updating cards to the allow cards array
    AccessManager.findByIdAndUpdate(accessManagerId,
        { $addToSet: { allowedCards: { $each: [ cardId ] } } },
        // { safe: true, upsert: false },
        function (err, doc) {
            if (err) {
                res.status(500).json({ message: 'Fail to update' })
            } else {
                res.status(200).json({ message: 'update complete' })
            }
        }
    );
});

router.post('/addAvailableRoom/:accessMangerId',(req,res) => {
    const accessManager = req.params.id;
    const roomId = req.body.roomId;

    AccessManager.findOneAndUpdate(accessManager,{$set:{roomId: roomId}},

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

