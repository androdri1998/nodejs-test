const CounterUnreadMessagesChatRoomService = require('./CounterUnreadMessagesChatRoomService');
const FakeChatRoomsRepository = require('../infra/mongoose/repositories/ChatRoomsRepository/fakes/FakeChatRoomsRepository');

let fakeChatRoomsRepository;
let counterUnreadMessagesChatRoomService;

describe('CounterNonReadMessagesChatRoomService', () => {
  beforeEach(() => {
    fakeChatRoomsRepository = new FakeChatRoomsRepository({ connection: null });
    counterUnreadMessagesChatRoomService = new CounterUnreadMessagesChatRoomService(
      {
        chatRoomsRepository: fakeChatRoomsRepository,
      },
    );
  });

  it('should be able to list counter of unread-messages at chat room', async () => {
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
          readed: true,
          created_at: Date.now(),
          updated_at: Date.now(),
          deleted_at: null,
        },
      ],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    await fakeChatRoomsRepository.saveChatRoom({ chatRoom });

    const response = await counterUnreadMessagesChatRoomService.execute({
      chatRoomId: 'test_id',
    });

    expect(response.amount_unread_messages_chat_room).toBe(1);
  });
});
