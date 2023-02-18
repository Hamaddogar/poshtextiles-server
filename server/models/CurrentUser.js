const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const CurrentUserSchema = new Schema({

    name: {
        type: String,
    },
    password: {
        type: String,
    },
    creationtime: {
        type: Number,
    }

});

module.exports = User = mongoose.model('currentuser', CurrentUserSchema);
