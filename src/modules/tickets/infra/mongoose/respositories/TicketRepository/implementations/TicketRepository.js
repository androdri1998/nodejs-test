const Ticket = require('../../../models/Ticket');

class TicketRepository {
  constructor({ connection }) {
    this.connection = connection;
  }

  createTicket({ title, description, permalink }) {
    const ticket = new Ticket({ title, description, permalink });
    return ticket;
  }

  async saveTicket({ ticket }) {
    await ticket.save();
    return ticket;
  }

  async findTicketById({ ticketId }) {
    const ticket = await Ticket.findById(ticketId);
    return ticket;
  }
}

module.exports = TicketRepository;
