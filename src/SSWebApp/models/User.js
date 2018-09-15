const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Card = require('./Card')

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    firstName: {
        type: String,
        required: true
    },
    
    lastName:{
        type: String,
        required: true
    },

    // phoneNumber: {
    //     type: String,
    //     required: true
    // },

    // emailAddress: {
    //     type: String,
    //     required: true
    // },

    // role: {
    //     type: Boolean,
    //     required: true
    // },

    _cardId: [{ type: mongoose.Schema.Types.ObjectId,
        ref:'Card'
    }]

})


module.exports = User = mongoose.model('User', UserSchema)