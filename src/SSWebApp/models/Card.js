const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var User = require('./User')

const CardSchema = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    cardNumber: {type: String,required: true},
    isActive: {type: Boolean,default:false, required: true},
    userId: { type:mongoose.Schema.Types.ObjectId, ref:'User'},
})

module.exports = Card = mongoose.model('Card', CardSchema);

CardSchema.statics.findByName = function(name, cb) {
    return this.find({ name: new RegExp(name, 'i') }, cb);
  };

module.exports.addUser = function(userId, callback){
    this.update({userId: userId}, callback)
}

module.exports.addUserByNumber = function(userNumber, cb){
    this.update({userNumber: userNumber}, cb)
}

module.exports.getCardByNumber = (cardNumber, callback) => {
    const query = {cardNumber:cardNumber};
    Card.findOne(query,callback);
}
