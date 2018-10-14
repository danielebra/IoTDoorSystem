const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessRequestSchema = new Schema ({
    outcome: { type: String},
    timestamp: { type: Date, required: true },
    roomName: { type: String, required: true},
    cardNumber: { type: String, required: true}
})

module.exports = AccessRequest = mongoose.model('accessRequest', accessRequestSchema, "accessRequest")