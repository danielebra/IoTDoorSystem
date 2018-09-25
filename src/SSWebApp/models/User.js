const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Card = require('./Card')

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userNumber: { type: String, required:true },
    firstName: { type: String, required: true },
    lastName:{ type: String,required: true },
    phoneNumber: { type: String },
    emailAddress: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default:false},
    cardId: { type:mongoose.Schema.Types.ObjectId, ref:'Card'}

})

module.exports = User = mongoose.model('User', UserSchema)

module.exports.getUserByEmailAddress = (email,callback) => {
    const query = {email: email}
    User.findOne(query,callback);
}

module.exports.getUserByNumber = (userNumber,callback) => {
    const query = {userNumber: userNumber}
    User.findOne(query,callback);
}

module.exports.addCard = function(cardId, cb){
    this.update({cardId: cardId}, cb)
}

module.exports.updateUser = (cardId, callback) => {
    let query = {_id : card._id};
    let newValue = { $set: { cardId: card.cardId, cardId: card.cardId}};
    Card.updateOne(query,newValue,callback);
}
