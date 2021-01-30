const mongoose = require('../../../../../shared/infra/mongoose');
const ticketSchema = require('../schemas/Ticket.schema');

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
