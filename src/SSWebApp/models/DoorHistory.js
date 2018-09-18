//Seems redundant
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoorHistorySchema = new Schema ({
    outcome: {
        type: String,
        required: true
    },
    
    time:{
        type: Date,
        default: Date.now
    }
});

module.exports = DoorHistory = mongoose.model('Door', DoorHistorySchema)