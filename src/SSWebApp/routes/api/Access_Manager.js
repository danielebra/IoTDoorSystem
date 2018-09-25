const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Access_Manager = require('../../models/Access_Manager');
const card = require('../../models/Card');

router.get('/', (req, res) => {
    Access_Manager.find()
        .then(access_Manager => res.json(access_Manager))
});

router.post('/', (req, res) => {
    const newAccess_Manager = new Access_Manager({
        _id: new mongoose.Types.ObjectId(),
        cardId: req.body.cardId,
        roomId: req.body.roomId
    });
    newAccess_Manager.save().then(access_Manager => res.json(access_Manager));
});
/*
router.post('/:roomId', (req, res, next) => {
    const roomId = req.params.roomId;
    const cardId = req.params.cardId;


    // Access_Manager.findOne(roomId, (err) => {
    //     if(err) {
    //         console.log(err);
    //         res.status(500).json({message:"no room found"})
    //     } else {
    //         res.status(200).json("roomId");
    //     }
    // }

    // router.get('/', (req, res) => {
    //     Access_Manager.find()
    //         .then(access_Manager => res.json(access_Manager))
    // });
    // let rawResults = Access_Manager.find();
    // console.log(rawResults);
    // for (const item of rawResults) {
    //     if (item["roomId"] == roomId)
    //     {
    //         console.log("we found a match");
    //     }

    // }
    
    /*
    Access_Manager.find({roomId:roomId})
    .exec()
    .then(access_Manager => {
        if(access_Manager) {
            res.status(200).json(access_Manager);
        } else {
            res.status(404).json({message:'No id found'})
        }
    })
    .catch(err => {
        res.status(500).json({error:err})
    });
})*/
router.get('/:roomId', (req, res) => {
    const roomId = req.params.roomId;
    const cardId = req.params.cardId;
    Access_Manager.find({roomId: /roomId/i})
        .then(access_Manager => res.json(access_Manager))
    })



router.post('/addAllowCard', (req, res) => {
    const _id = "5ba9d26b7681031fbfe45272";
    const cardId = req.body.cardId;

    //TODO: fix this updating cards to the allow cards array
    Access_Manager.findByIdAndUpdate(_id,
        { $push: { allowedCards: [{ cardId: card.cardId }] } },
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


// Access_Manager.findById(_id, (err, access_Manager) => {
//     Access_Manager.addAllowCard(cardId, function(err) {
//         if(err) {
//             return res.status(500).json({ success:true, msg: 'Fail to add user to card'})
//         } else {
//             return res.status(200).json({ success:true, msg: 'New Allowed card is added'})
//         }
//     })
// })
// Access_Manager.findByIdAndUpdate(_id,
//     { "$push": { <allowedCards> : cardId } },
//     { "new": true, "upsert": true },
//     function (err, access_Manager) {
//         if (err) throw err;
//         console.log(access_Manager);
//     }
// );


module.exports = router;

