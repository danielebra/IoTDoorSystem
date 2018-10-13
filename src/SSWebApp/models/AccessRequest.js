//Need edit: missing ID
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessRequestSchema = new Schema ({
    outcome: { type: String},
    timestamp: { type: Date, required: true },
    roomName: { type: String, required: true},//type:mongoose.Schema.Types.ObjectId, ref:'Room' }
    cardNumber: { type: String, required: true}//type:mongoose.Schema.Types.ObjectId, ref:'Card' },
})

module.exports = AccessRequest = mongoose.model('accessRequest', accessRequestSchema, "accessRequest")