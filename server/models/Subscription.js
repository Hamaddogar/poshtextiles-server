const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const NewsSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    creationstamp: {
        type: Number,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('Subscription', NewsSchema);
