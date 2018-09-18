const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var User = require('./User')

const CardSchema = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    cardNumber: {type: Number,required: true},
    isActive: {type: Boolean,default:false, required: true},
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
})

module.exports = Card = mongoose.model('Card', CardSchema)