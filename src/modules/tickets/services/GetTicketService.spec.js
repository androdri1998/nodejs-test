const GetTicketService = require('./GetTicketService');
const FakeTicketRepository = require('../infra/mongoose/respositories/TicketRepository/fakes/FakeTicketRepository');

let fakeTicketRepository;
let getTicketService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeTicketRepository = new FakeTicketRepository({ connection: null });
    getTicketService = new GetTicketService({
      ticketRepository: fakeTicketRepository,
    });
  });

  it('should be able to get ticket from application', async () => {
    const mockTicket = {
      _id: 'c177529b-f7da-4ccb-a4bb-c7212620628a',
      title: 'test title',
      description: 'test description',
      permalink: 'image.jpg',
      created_at: Date.now(),
      updated_at: Date.now(),
      deleted_at: null,
    };

    await fakeTicketRepository.saveTicket({ ticket: mockTicket });

    const { ticket: ticketResponse } = await getTicketService.execute({
      // eslint-disable-next-line no-underscore-dangle
      ticketId: mockTicket._id,
    });

    expect(ticketResponse).toHaveProperty('deleted_at');
    expect(ticketResponse).toHaveProperty('_id');
    expect(ticketResponse).toHaveProperty('title');
    expect(ticketResponse).toHaveProperty('description');
    expect(ticketResponse).toHaveProperty('permalink');
    expect(ticketResponse).toHaveProperty('created_at');
    expect(ticketResponse).toHaveProperty('updated_at');
  });
});
