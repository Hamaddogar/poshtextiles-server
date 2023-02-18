const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const NewBlog = new Schema({
    writername: {
        type: String,
        required: true,
    },
    heading: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    creationstamp: {
        type: Number,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('Blog', NewBlog);
