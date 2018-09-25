//Need edit: missing card array
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const card = require('../models/Card');

const Access_ManagerSchema = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    // allowedCards: [{ cardId: {type:mongoose.Schema.Types.ObjectId, ref:'Card' }}],
    allowedCards: [{cardId: {type:mongoose.Schema.Types.ObjectId, ref:'Card'}}],
    // roomId: { type:mongoose.Schema.Types.ObjectId, ref:'Room'}
    roomId: {type: String}
})

module.exports = Access_Manager = mongoose.model('Access_Manager', Access_ManagerSchema);

// module.exports.addCard = function(cardId, cb){
//     this.update({cardId: cardId}, cb)
// }

// module.exports.addAllowCard = function(req, res) {
//     findByIdAndUpdate(_id, 
//         { $push: { allowedCards: { cardId: card.cardId }}},
//         { safe: true, upsert:true}
// };
