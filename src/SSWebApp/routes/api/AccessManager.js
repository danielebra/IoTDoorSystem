const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const AccessManager = require('../../models/AccessManager');
const card = require('../../models/Card');

router.get('/', (req, res) => {
    AccessManager.find()
        .then(accessManager => res.json(accessManager))
});

router.post('/', (req, res) => {
    const newAccessManager = new AccessManager({
        _id: new mongoose.Types.ObjectId(),
        cardId: req.body.cardId,
        roomId: req.body.roomId
    });
    newAccessManager.save().then(accessManager => res.json(accessManager));
});


/*
router.post('/:roomId', (req, res, next) => {
    const roomId = req.params.roomId;
    const cardId = req.params.cardId;


    // AccessManager.findOne(roomId, (err) => {
    //     if(err) {
    //         console.log(err);
    //         res.status(500).json({message:"no room found"})
    //     } else {
    //         res.status(200).json("roomId");
    //     }
    // }

    // router.get('/', (req, res) => {
    //     AccessManager.find()
    //         .then(accessManager => res.json(accessManager))
    // });
    // let rawResults = AccessManager.find();
    // console.log(rawResults);
    // for (const item of rawResults) {
    //     if (item["roomId"] == roomId)
    //     {
    //         console.log("we found a match");
    //     }

    // }
    
    /*
    AccessManager.find({roomId:roomId})
    .exec()
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
})*/

router.get('/:roomNumber/:cardNumber', (req, res) => {
    const roomNum = req.params.roomNumber;
    const cardNum = req.params.cardNumber;
    
    AccessManager.findOne({"roomId": roomNum }, function(err,result) {
        if (err) {
            res.json(err)
        } 
        if (result) {}
        else {
            res.json('not found');
        }
    })
    .populate("allowedCards")
    .then(r => {
                let outcome = r.allowedCards.filter(card => {
                    return card.cardNumber == cardNum
                })
                res.json(outcome)
            })
    
            // .populate("allowedCards")
            // .then(r => {
            //     let outcome = r.allowedCards.filter(card => {
            //         return card.cardNumber == cardNum
            //     })
            //     res.json(outcome)
            // })
            /* this works
            AccessManager.findOne({"roomId": roomNum })
            .populate("allowedCards").then(r => {
                let outcome = r.allowedCards.filter(card => {
                    return card.cardNumber == cardNum
                })
                res.json(outcome)
            })
            */                                                
})



router.post('/addAllowCard', (req, res) => {
    const _id = "5bab2627454b992ce4aca399";
    const cardId = req.body.cardId;


    //TODO: fix this updating cards to the allow cards array
    AccessManager.findByIdAndUpdate(_id,
        { $addToSet: { allowedCards: {$each: [cardId]} } },
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


// AccessManager.findById(_id, (err, accessManager) => {
//     AccessManager.addAllowCard(cardId, function(err) {
//         if(err) {
//             return res.status(500).json({ success:true, msg: 'Fail to add user to card'})
//         } else {
//             return res.status(200).json({ success:true, msg: 'New Allowed card is added'})
//         }
//     })
// })
// AccessManager.findByIdAndUpdate(_id,
//     { "$push": { <allowedCards> : cardId } },
//     { "new": true, "upsert": true },
//     function (err, accessManager) {
//         if (err) throw err;
//         console.log(accessManager);
//     }
// );


module.exports = router;

