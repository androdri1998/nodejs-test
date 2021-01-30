class CreateTicketService {
  constructor({ ticketRepository, storageProvider }) {
    this.ticketRepository = ticketRepository;
    this.storageProvider = storageProvider;

    this.execute = this.execute.bind(this);
  }

  async execute({ title, description, imageFilename }) {
    const filename = await this.storageProvider.saveFile({
      file: imageFilename,
    });

    const ticket = this.ticketRepository.createTicket({
      title,
      description,
      permalink: filename,
    });

    const ticketSaved = await this.ticketRepository.saveTicket({ ticket });

    return ticketSaved;
  }
}

module.exports = CreateTicketService;
