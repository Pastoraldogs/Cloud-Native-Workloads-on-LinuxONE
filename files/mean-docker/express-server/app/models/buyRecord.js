var mongoose = require('mongoose');

// Define the schema
module.exports = mongoose.model('BuyRecord', {
    name: {
        type: String,
        default: ''
    },

    product: {
        type: String,
        default: ''
    },

    amount: {
        type: Number,
        default: 0
    },

    time: {
        type: Number,
        default: 0
    }

});