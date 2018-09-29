//Need edit: missing ID
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessRequestSchema = new Schema ({
    outcome: { type: String, required: true },
    timestamp: { type: Date, required: true },
    cardNumber: { type: Number, required: true},//type:mongoose.Schema.Types.ObjectId, ref:'Card' },
    roomNumber: { type: Number, required: true}//type:mongoose.Schema.Types.ObjectId, ref:'Room' }
})

module.exports = AccessRequest = mongoose.model('accessRequest', accessRequestSchema, "accessRequest")