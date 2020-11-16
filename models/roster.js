const mongoose = require('mongoose');

const rosterSchema = new mongoose.Schema({
    empID: Number,
    name: String,
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    manEmail: String,
    Account: String,
}, { timestamps: { createdAt: 'created_at' } });

const Roster = mongoose.model('Roster', rosterSchema);
module.exports = Roster;