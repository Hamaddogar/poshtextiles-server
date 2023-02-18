const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const DisputeSchema = new Schema({
    claimedby: {
        type: String,
        required: true,
    },
    claimedto: {
        type: String,
        required: true,
    },
    disputetopic: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isResolved: {
        type: Boolean,
        required: true
    },
    creationstamp: {
        type: Number,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('Dispute', DisputeSchema);
