const mongoose = require('mongoose');
const ticketSchema = require('../schemas/Ticket.schema');

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
