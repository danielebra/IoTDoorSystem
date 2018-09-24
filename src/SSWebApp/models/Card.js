const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var User = require('./User')

const CardSchema = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    cardNumber: {type: String,required: true},
    isActive: {type: Boolean,default:false, required: true},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
})

module.exports = Card = mongoose.model('Card', CardSchema);

CardSchema.statics.findByName = function(name, cb) {
    return this.find({ name: new RegExp(name, 'i') }, cb);
  };

// module.exports.addUser = (card, callback) => {
//     let myquery = { _id : card._id }
//     let newvalues = { $set: { user: user.userId}}
//     User.updateOne(myquery, newvalues, callback);
// }

module.exports.addUser = function(userId, cb){
    this.update({userId: userId}, cb)
}

module.exports.getCardByNumber = (cardNumber, callack) => {
    const query = {cardNumber:cardNumber};
    user.findOne(query,callack);
}
