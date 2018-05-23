const mongoose = require('mongoose');

let UserRegistration = {
    name: String,
    family: String,
    updated_date: { type: Date, default: Date.now }
};

module.exports = mongoose.model('Registration', UserRegistration);