var mongoose = require('mongoose');

// Define the schema
module.exports = mongoose.model('User', {
    name: {
        type: String,
        default: ''
    },

    password: {
        type: String,
        default: ''
    },

    balance: {
        type: Number,
        default: 0
    },

    financing: {
        type: Number,
        default: 0
    }


});