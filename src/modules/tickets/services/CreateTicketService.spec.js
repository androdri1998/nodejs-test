const CreateTicketService = require('./CreateTicketService');
const FakeTicketRepository = require('../infra/mongoose/respositories/TicketRepository/fakes/FakeTicketRepository');
const FakeStorageProvider = require('../../../shared/providers/StorageProvider/fakes/FakeStorageProvider');

let createTicketService;
let fakeTicketRepository;
let fakeStorageProvider;

describe('CreateTicketService', () => {
  beforeEach(() => {
    fakeTicketRepository = new FakeTicketRepository({ connection: null });
    fakeStorageProvider = new FakeStorageProvider();
    createTicketService = new CreateTicketService({
      storageProvider: fakeStorageProvider,
      ticketRepository: fakeTicketRepository,
    });
  });

  it('should be able to create a ticket', async () => {
    const ticket = await createTicketService.execute({
      title: 'test title',
      description: 'test description',
      imageFilename: 'image.jpg',
    });

    expect(ticket).toHaveProperty('deleted_at');
    expect(ticket).toHaveProperty('_id');
    expect(ticket).toHaveProperty('title');
    expect(ticket).toHaveProperty('description');
    expect(ticket).toHaveProperty('permalink');
    expect(ticket).toHaveProperty('created_at');
    expect(ticket).toHaveProperty('updated_at');
  });
});
