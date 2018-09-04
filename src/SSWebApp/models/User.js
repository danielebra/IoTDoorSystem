const mongoose = request('mongoose');
const Schema = mongoose.Schema;
var Card = require('./Card')

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    
    lastName:{
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    emailAddress: {
        type: String,
        required: true
    },

    role: {
        type: Boolean,
        required: true
    },

    cardId: {
        type: Card._id,
        ref:'Card'
    }

})


module.exports = User = mongoose.model('User', UserSchema)