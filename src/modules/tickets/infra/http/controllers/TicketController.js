const HTTPStatusCodes = require('http-status-codes');

const DiskStorageProvider = require('../../../../../shared/providers/StorageProvider/implementations/DiskStorageProvider');
const CreateTicketService = require('../../../services/CreateTicketService');
const GetTicketService = require('../../../services/GetTicketService');

class TicketController {
  constructor({ ticketRepository }) {
    this.ticketRepository = ticketRepository;

    this.get = this.get.bind(this);
    this.store = this.store.bind(this);
  }

  async get(req, res) {
    const { ticket_id: ticketId } = req.params;

    const getTicketService = new GetTicketService({
      ticketRepository: this.ticketRepository,
    });

    const response = await getTicketService.execute({ ticketId });

    return res.status(HTTPStatusCodes.StatusCodes.OK).json(response);
  }

  async store(req, res) {
    const { title, description } = req.body;
    const { filename } = req.file;

    const diskStorageProvider = new DiskStorageProvider();
    const createTicketService = new CreateTicketService({
      ticketRepository: this.ticketRepository,
      storageProvider: diskStorageProvider,
    });

    const response = await createTicketService.execute({
      title,
      description,
      imageFilename: filename,
    });

    return res.status(HTTPStatusCodes.StatusCodes.CREATED).json(response);
  }
}

module.exports = TicketController;
