const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const AccessManager = require('../../models/AccessManager');
//Item Model
const Room = require('../../models/Room');

router.get('/', (req, res, next) => {
    Room.find()
        .exec(function (err, room) {
            res.send(room)
        })
    // .then(room => res.json(room))
});

//@route POST api/items
//Create all the items
//Access public

router.post('/', (req, res) => {
    const newRoom = new Room({
        _id: new mongoose.Types.ObjectId(),
        roomNumber: req.body.roomNumber,
        name: req.body.name,
        location: req.body.location,
        isHardlocked: req.body.isHardlocked,
        accessManagerId:req.body.accessManagerId
    });
    newRoom.save().then(room => res.json(room));
});

router.get('/allRoomsByLocation/:location', (req, res, next) => {
    const location = req.params.location
    Room.find({"location": location}).then(results => res.json(results))
});
//TODO: Fix CastError when trying to find wrong object Id

//Get each room by Id
router.get('/:roomId', (req, res, next) => {
    const id = req.params.roomId;
    Room.findById(id)
        .lean()
        .exec()
        .then(room => {
            if (room) {
                res.status(200).json(room);
            } else {
                res.status(404).json({ message: 'No id found' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
})

router.get('/findRoomByNumber/:roomNumber', (req,res,next) => {
    const roomNumber = req.params.roomNumber;
    Room.findOne({roomNumber})
        .then(room => res.status(200).json(room))
})

router.get('/findAccessManagerByRoomName/:roomName', (req,res,next) => {
    const roomName = req.params.roomName;

    Room.findOne({"name":roomName}, (err,result) => {
        if(result) {
            res.json(result)
        } else {
            res.status(404).json({ message: 'No id found' })
        }
    })
})

router.post('/addAccessManager/:roomNumber/:accessManagerId',(req,res,next) => {
    const roomNumber = req.params.roomNumber;
    const accessManagerId = req.params.accessManagerId;

    Room.findOneAndUpdate({"roomNumber":roomNumber},{$set:{accessManagerId: accessManagerId}} ,(err,result) => {
        if (err) {
            res.status(500).json({ message: 'Fail to update' })
        } else {
            res.status(200).json({ message: 'update complete' })
        }
    })

})

module.exports = router;