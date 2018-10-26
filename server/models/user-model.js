const mongoose = require('mongoose');

module.exports = mongoose.model('Registration', {
    nick: {type: String, request: true},
    name: {type: String, request: true},
    pass: {type: String, request: true},
    updated_date: {type: Date, default: Date.now}
})