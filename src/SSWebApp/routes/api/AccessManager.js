const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const AccessManager = require('../../models/AccessManager');

router.get('/', (req, res) => {
    AccessManager.find()
        .then(accessManager => res.json(accessManager))
});

router.get('/:accessManagerId', (req, res, next) => {
    const id = req.params.accessManagerId;
    AccessManager.findById(id)
        .then(accessManager => {
            if (accessManager) {
                res.status(200).json(accessManager);
            } else {
                res.status(404).json({ message: 'No id found' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
})

router.post('/', (req, res) => {
    const newAccessManager = new AccessManager({
        _id: new mongoose.Types.ObjectId(),
        allowedCards: req.body.cardId,
        roomNumber: req.body.roomNumber
    });
    newAccessManager.save().then(accessManager => res.json(accessManager));
});

router.post('/addAllowCard/:accessManagerId/:cardNumber', (req, res) => {
    const accessManagerId = req.params.accessManagerId;
    const cardNumber = req.params.cardNumber;

    const cardId = req.params.cardId;

    AccessManager.findById(accessManagerId, (err, accessManager) => {
        if (err) {
            res.json('An Error Occured')
        }
        if (accessManager) {
            Card.findOne({ "cardNumber": cardNumber }, (err, card) => {
                if (err) {
                    res.status(500).json(err)
                } if (card) {
                    accessManager.update({ $addToSet: { "allowedCards": card._id } }, (err, result) => {
                        console.log(accessManagerId)
                        if (err) {
                            console.log('err')
                            res.json(err)
                        } else if (result) {
                            console.log(result)
                            res.json(result)
                        } else {
                            res.json('not found')
                        }
                    })
                } else {
                    res.json("not found")
                }
            })
        }
        else {
            res.json('No Access Manager Found')
        }
    })

})

router.get('/findAccessManagerByRoomName/:roomName', (req, res, next) => {
    const roomName = req.params.roomName;

    Room.findOne({"name":roomName}).populate({path: 'accessManagerId', 
    populate :{path: 'allowedCards', populate: {path: 'userId'} }}).exec((err,result) => {
        if (err)
        {
            console.log(err)
        }
        if(result) {
        //     result.accessManagerId.populate("cardId").exec((err, result) =>
        // {
        //     console.log(result)
        //     res.json(result)
        // })
            res.json(result)
        } 
        
        else {
            res.status(404).json({ message: 'No id found' })
        }
    })
})

router.post('/addAvailableRoom/:accessMangerId', (req, res) => {
    const accessManager = req.params.id;
    const roomId = req.body.roomId;

    AccessManager.findOneAndUpdate(accessManager, { $set: { roomId: roomId } },

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

