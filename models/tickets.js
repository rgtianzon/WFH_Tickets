const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticketID: Number,
    name: String,
    email: String,
    manEmail: String,
    department: String,
    queryType: String,
    severity: String,
    otherSpecify: String,
    issueDiscription: String,
    image: String,
}, { timestamps: { createdAt: 'created_at' } });

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;

const rosterSchema = new mongoose.Schema({
    empID: Number,
    name: String,
    email: String,
    manEmail: String,
    Account: String,
}, { timestamps: { createdAt: 'created_at' } });

const Roster = mongoose.model('Roster', rosterSchema);
module.exports = Roster;