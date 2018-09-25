const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Access_Manager = require('../../models/Access_Manager');

router.get('/', (req,res) => {
    Access_Manager.find()
        .then(access_Manager => res.json(access_Manager))
});

router.post('/', (req,res) => {
    const newAccess_Manager = new Access_Manager({
        _id: new mongoose.Types.ObjectId(),
        allowedCards: req.body.cardId,
        roomId: req.body.roomId
    });
    newAccess_Manager.save().then(access_Manager => res.json(access_Manager));
});

router.put('/:id',(req,res) => {
        // const accessManagerId = req.body.accessManagerId;
        const allowedCards = req.body.cardId;

        Access_Manager.findById(req.params.body, (err, access_Manager) => {
            Access_Manager.push(allowedCards, function(err) {
                if(err) {
                    return res.status(500).json({ success:true, msg: 'Fail to add user to card'})
                } else {
                    return res.status(200).json({ success:true, msg: 'New Allowed card is added'})
                }
            })
            
        })
})

module.exports = router;

