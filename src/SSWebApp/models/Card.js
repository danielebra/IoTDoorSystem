const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var User = require('./User')

const CardSchema = new Schema ({
    cardNumber: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    
    cardId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Card'
    }

    



})

module.exports = Card = mongoose.model('Card', CardSchema)