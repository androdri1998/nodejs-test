const CounterNonReadMessagesChatRoomService = require('./CounterNonReadMessagesChatRoomService');
const FakeChatRoomsRepository = require('../infra/mongoose/repositories/ChatRoomsRepository/fakes/FakeChatRoomsRepository');

let fakeChatRoomsRepository;
let counterNonReadMessagesChatRoomService;

describe('CounterNonReadMessagesChatRoomService', () => {
  beforeEach(() => {
    fakeChatRoomsRepository = new FakeChatRoomsRepository({ connection: null });
    counterNonReadMessagesChatRoomService = new CounterNonReadMessagesChatRoomService(
      {
        chatRoomsRepository: fakeChatRoomsRepository,
      },
    );
  });

  it('should be able to list counter of non-read-messages at chat room', async () => {
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

    const response = await counterNonReadMessagesChatRoomService.execute({
      chatRoomId: 'test_id',
    });

    expect(response.amount_non_read_messages_chat_room).toBe(1);
  });
});
