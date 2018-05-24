const mongoose = require('mongoose');

module.exports = mongoose.model('Registration', {
    nick: {type: String},
    name: {type: String},
    updated_date: { type: Date, default: Date.now }
});