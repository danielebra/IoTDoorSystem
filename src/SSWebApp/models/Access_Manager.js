//Need edit: missing card array
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Access_ManagerSchema = new Schema ({
    AllowedCard: {
        type: Boolean,
        required: true
    },
    Room:{
        
        required: true
    }
})

module.exports = Access_Manager = mongoose.model('Access_Manager', Access_ManagerSchema)