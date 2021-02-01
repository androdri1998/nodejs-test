const ListMessagesChatRoomService = require('./ListMessagesChatRoomService');
const FakeChatRoomsRepository = require('../infra/mongoose/repositories/ChatRoomsRepository/fakes/FakeChatRoomsRepository');

let fakeChatRoomsRepository;
let listMessagesChatRoomService;

describe('ListMessagesChatRoomService', () => {
  beforeEach(() => {
    fakeChatRoomsRepository = new FakeChatRoomsRepository({ connection: null });
    listMessagesChatRoomService = new ListMessagesChatRoomService({
      chatRoomsRepository: fakeChatRoomsRepository,
    });
  });

  it('should be able to list messages', async () => {
    const chatRoom = {
      deleted_at: null,
      _id: 'test_id',
      ticketId: 'ticket_id',
      description: 'test description',
      permalink: 'image.jpg',
      permission: 'admin',
      participants: [
        {
          _id: 'test_id_generate',
          userId: 'test_user_id',
        },
      ],
      messages: [
        {
          userId: 'test_user_id',
          content: 'teste content 1',
          readed: false,
          created_at: Date.now(),
          updated_at: Date.now(),
          deleted_at: null,
        },
        {
          userId: 'test_user_id',
          content: 'teste content 2',
          readed: false,
          created_at: Date.now(),
          updated_at: Date.now(),
          deleted_at: null,
        },
      ],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    await fakeChatRoomsRepository.saveChatRoom({ chatRoom });

    const { messages } = await listMessagesChatRoomService.execute({
      ticketId: 'ticket_id',
    });

    await expect(messages.length).toBe(2);
  });
});
