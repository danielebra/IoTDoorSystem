const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Access_RequestSchema = new Schema ({
    Outcome: {
        type: Boolean,
        required: true
    },
    TimeStamp: {
        type: Date,
        required: true
    },
    CardID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Card'
    },
    RoomID:{
        required: true
    }
})

module.exports = DoorHistory = mongoose.model('Access_Request', Access_RequestSchema)