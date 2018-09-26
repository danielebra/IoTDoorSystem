//Need edit: missing card array
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const card = require('../models/Card');

const AccessManagerSchema = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    // allowedCards: [{ cardId: {type:mongoose.Schema.Types.ObjectId, ref:'Card' }}],
    allowedCards:[{ type: mongoose.Schema.Types.ObjectId, ref:'Card' }],
    // roomNumber: { type:mongoose.Schema.Types.String, ref:'Room'},
    roomId: { type:String, ref:'Room'},
})

module.exports = AccessManager = mongoose.model('Access_Manager', AccessManagerSchema);

// module.exports.addCard = function(cardId, cb){
//     this.update({cardId: cardId}, cb)
// }

// module.exports.addAllowCard = function(req, res) {
//     findByIdAndUpdate(_id, 
//         { $push: { allowedCards: { cardId: card.cardId }}},
//         { safe: true, upsert:true}
// };
