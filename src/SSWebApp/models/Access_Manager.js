//Need edit: missing card array
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Access_ManagerSchema = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    allowedCards: [{ type:mongoose.Schema.Types.ObjectId, ref:'Card'}],
    roomId: { type:mongoose.Schema.Types.ObjectId, ref:'Room'}
})

module.exports = Access_Manager = mongoose.model('Access_Manager', Access_ManagerSchema);

module.exports.addCard = function(cardId, cb){
    this.update({cardId: cardId}, cb)
}

exports.update = function(req, res) {
    var query={'accessMangerId': req.body.accessMangerId};
    var update = {$push: {'allowedCards': req.body.cardId}};

    Network.findOneAndUpdate(query, update, function(err, doc){ 
        if (err) {
            return res.status(500).json({ success:true, msg: 'Fail to add card'})
        } else {
            return res.status(200).json({ success:true, msg: 'This card is allowed'})
        }
     });
};