const { v4: uuidV4 } = require('uuid');

class FakeTicketRepository {
  constructor({ connection }) {
    this.connection = connection;

    this.tickets = [];
  }

  createTicket({ title, description, permalink }) {
    const ticket = {
      _id: uuidV4(),
      title,
      description,
      permalink,
      created_at: Date.now(),
      updated_at: Date.now(),
      deleted_at: null,
    };

    return ticket;
  }

  async saveTicket({ ticket }) {
    this.tickets.push(ticket);
    return ticket;
  }

  async findTicketById({ ticketId }) {
    // eslint-disable-next-line no-underscore-dangle
    const ticket = this.tickets.find(ticketFind => ticketFind._id === ticketId);
    return { toObject: () => ticket };
  }
}

module.exports = FakeTicketRepository;
