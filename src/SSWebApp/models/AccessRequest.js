//Need edit: missing ID
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessRequestSchema = new Schema ({
    Outcome: { type: Boolean, required: true },
    TimeStamp: { type: Date, required: true },
    cardId: { type:mongoose.Schema.Types.ObjectId, ref:'Card' },
    roomId: { type:mongoose.Schema.Types.ObjectId, ref:'Room' }
})

module.exports = AccessRequest = mongoose.model('accessRequest', accessRequestSchema, "accessRequest")