//Needs room array
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//var Access_Manager = require('./Access_Manager')

const SiteSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    address:{type: String,required: true },
    //accessManagerId: [{ type: mongoose.Schema.Types.ObjectId, ref:'Access_Manager'}]
})

module.exports = Site = mongoose.model('Site', SiteSchema)