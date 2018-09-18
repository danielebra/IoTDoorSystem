const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Card = require('./Card')

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName:{type: String,required: true },
    phoneNumber: { type: String },
    emailAddress: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default:false},
    cardId: {type:mongoose.Schema.Types.ObjectId, ref:'Card'},
})

module.exports = User = mongoose.model('User', UserSchema)