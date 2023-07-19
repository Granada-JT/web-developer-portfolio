const mongoose = require('mongoose');
const moment = require('moment-timezone');

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Full name is required.']
    },
    emailAddress: {
        type: String,
        required: [true, 'Email address is required.']
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required.'],
    },
    message: {
        type: String,
        required: [true, 'Message is required.']
    },
    sentOn: {
        type: Date,
        default: () => new Date(moment().tz('Asia/Manila').toDate())
    },
});

module.exports = mongoose.model('Visitor', visitorSchema);