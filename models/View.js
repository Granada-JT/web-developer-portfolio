const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
    totalViews: {
        type: Number,
        required: [true, 'totalViews is required']
    },
    ipaddress: {
        type: String,
        required: [true, 'ipaddress is required']
    },
    visitedOn: {
        type: Date,
        default: new Date()
    },
});

module.exports = mongoose.model('View', viewSchema);
