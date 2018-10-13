//Need confirmation
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Access_Manager = require('./AccessManager')

const RoomSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    roomNumber: {type: String, required: true},
    name: { type: String, required: true },
    location:{type: String,required: true },
    isHardlocked: { type: String},
    accessManagerId: { type:mongoose.Schema.Types.ObjectId, ref:'Access_Manager'}
})

module.exports = Room = mongoose.model('Room', RoomSchema)

