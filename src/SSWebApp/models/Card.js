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
        default:false,
        required: true
    },
    
    _userId: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
})

module.exports = Card = mongoose.model('Card', CardSchema)