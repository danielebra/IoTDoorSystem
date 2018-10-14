const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SiteSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    address:{type: String,required: true },
})

module.exports = Site = mongoose.model('Site', SiteSchema)