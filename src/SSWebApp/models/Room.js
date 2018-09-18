//Need confirmation
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Access_Manager = require('./Access_Manager')

const RoomSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    location:{type: String,required: true },
    isHardlocked: { type: String,required: true },
    accessManagerId: [{ type: mongoose.Schema.Types.ObjectId, ref:'Access_Manager'}]
})

module.exports = Room = mongoose.model('Room', RoomSchema)