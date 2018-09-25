//Need edit: missing card array
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Access_ManagerSchema = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    allowedCards: [{ type:mongoose.Schema.Types.ObjectId, ref:'Card'}],
    roomId: { type:mongoose.Schema.Types.ObjectId, ref:'Room'}
})

module.exports = Access_Manager = mongoose.model('Access_Manager', Access_ManagerSchema)