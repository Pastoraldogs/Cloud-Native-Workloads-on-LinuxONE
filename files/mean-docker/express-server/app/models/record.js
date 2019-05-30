var mongoose = require('mongoose');

// Define the schema
module.exports = mongoose.model('Record', {
    text: {
        type: String,
        default: ''
    },

    value: {
        type: String,
        default: ''
    }

});