const AddMessageChatRoomService = require('./AddMessageChatRoomService');
const FakeChatRoomsRepository = require('../infra/mongoose/repositories/ChatRoomsRepository/fakes/FakeChatRoomsRepository');

let fakeChatRoomsRepository;
let addMessageChatRoomService;

describe('AddMessageChatRoomService', () => {
  beforeEach(() => {
    fakeChatRoomsRepository = new FakeChatRoomsRepository({ connection: null });
    addMessageChatRoomService = new AddMessageChatRoomService({
      chatRoomsRepository: fakeChatRoomsRepository,
    });
  });

  it('should be able to send message', async () => {
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
      messages: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    await fakeChatRoomsRepository.saveChatRoom({ chatRoom });

    const { messages } = await addMessageChatRoomService.execute({
      userId: 'test-user-id',
      chatRoomId: 'test_id',
      content: 'test message',
    });

    expect(messages.length).toBe(1);
  });
});
