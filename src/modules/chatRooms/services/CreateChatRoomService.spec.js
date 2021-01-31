const CreateChatRoomService = require('./CreateChatRoomService');
const FakeChatRoomsRepository = require('../infra/mongoose/repositories/ChatRoomsRepository/fakes/FakeChatRoomsRepository');
const FakeTicketRepository = require('../../tickets/infra/mongoose/respositories/TicketRepository/fakes/FakeTicketRepository');
const AppError = require('../../../shared/errors/AppError');

describe('CreateChatRoomService', () => {
  beforeEach(() => {});

  it('should be able to create chat room', async () => {
    const fakeChatRoomsRepository = new FakeChatRoomsRepository({
      connection: null,
    });
    const fakeTicketRepository = new FakeTicketRepository({ connection: null });
    const createChatRoomService = new CreateChatRoomService({
      chatRoomsRepository: fakeChatRoomsRepository,
      ticketRepository: fakeTicketRepository,
    });

    const ticket = {
      _id: 'c177529b-f7da-4ccb-a4bb-c7212620628a',
      title: 'test title',
      description: 'test description',
      permalink: 'image.jpg',
      created_at: Date.now(),
      updated_at: Date.now(),
      deleted_at: null,
    };

    await fakeTicketRepository.saveTicket({ ticket });

    const chatRoom = await createChatRoomService.execute({
      ticketId: 'c177529b-f7da-4ccb-a4bb-c7212620628a',
      description: 'test description',
      permalink: 'image.jpg',
      permission: 'admin',
      participants: [],
    });

    expect(chatRoom).toHaveProperty('deleted_at');
    expect(chatRoom).toHaveProperty('_id');
    expect(chatRoom).toHaveProperty('ticketId');
    expect(chatRoom).toHaveProperty('description');
    expect(chatRoom).toHaveProperty('permalink');
    expect(chatRoom).toHaveProperty('permission');
    expect(chatRoom).toHaveProperty('participants');
    expect(chatRoom).toHaveProperty('messages');
    expect(chatRoom).toHaveProperty('created_at');
    expect(chatRoom).toHaveProperty('updated_at');
  });

  it('should not be able to create chat room without a ticket created', async () => {
    const fakeChatRoomsRepository = new FakeChatRoomsRepository({
      connection: null,
    });
    const fakeTicketRepository = new FakeTicketRepository({ connection: null });
    const createChatRoomService = new CreateChatRoomService({
      chatRoomsRepository: fakeChatRoomsRepository,
      ticketRepository: fakeTicketRepository,
    });

    await expect(
      createChatRoomService.execute({
        ticketId: 'c177529b-f7da-4ccb-a4bb-c7212620628a',
        description: 'test description',
        permalink: 'image.jpg',
        permission: 'admin',
        participants: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
