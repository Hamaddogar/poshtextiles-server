const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const PaymentSchema = new Schema({
    fromemail: {
        type: String,
        required: true,
    },
    fromwalletAddress: {
        type: String,
        required: true,
    },
    towalletAddress: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    creationstamp: {
        type: Number,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('Payment', PaymentSchema);
