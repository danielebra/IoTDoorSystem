const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var User = require('./User')

const CardSchema = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    cardNumber: {type: Number,required: true},
    isActive: {type: Boolean,default:false, required: true},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
})

module.exports = Card = mongoose.model('Card', CardSchema)