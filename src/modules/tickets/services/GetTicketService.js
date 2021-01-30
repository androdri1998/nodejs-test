const appConfig = require('../../../config/app');

class GetTicketService {
  constructor({ ticketRepository }) {
    this.ticketRepository = ticketRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ ticketId }) {
    const ticket = await this.ticketRepository.findTicketById({
      ticketId,
    });

    const ticketSerialized = {
      ...ticket.toObject(),
      url: `${appConfig.url}/files/${ticket.permalink}`,
    };

    return ticketSerialized;
  }
}

module.exports = GetTicketService;
