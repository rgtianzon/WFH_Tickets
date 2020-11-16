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
    status: String,
    image: String,
    comments: [{
        commentName: String,
        commentBody: String,
    }, { timestamps: { createdAt: 'created_at' } }]
}, { timestamps: { createdAt: 'created_at' } });

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;