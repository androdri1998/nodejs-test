const SetNonReadMessageChatRoomToReadedService = require('./SetNonReadMessageChatRoomToReadedService');
const FakeChatRoomsRepository = require('../infra/mongoose/repositories/ChatRoomsRepository/fakes/FakeChatRoomsRepository');

let fakeChatRoomsRepository;
let setNonReadMessageChatRoomToReadedService;

describe('AddSetNonReadMessageChatRoomToReadedService', () => {
  beforeEach(() => {
    fakeChatRoomsRepository = new FakeChatRoomsRepository({ connection: null });
    setNonReadMessageChatRoomToReadedService = new SetNonReadMessageChatRoomToReadedService(
      {
        chatRoomsRepository: fakeChatRoomsRepository,
      },
    );
  });

  it('should be able to update a non-read-message to readed', async () => {
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
          _id: 'test_id_message',
          userId: 'test_user_id',
          content: 'teste content 1',
          readed: false,
          created_at: Date.now(),
          updated_at: Date.now(),
          deleted_at: null,
        },
        {
          _id: 'test_id_message2',
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

    const mockResponse = {
      messages: [
        {
          _id: 'test_id_message',
          userId: 'test_user_id',
          content: 'teste content 1',
          readed: true,
          created_at: Date.now(),
          updated_at: Date.now(),
          deleted_at: null,
        },
        {
          _id: 'test_id_message2',
          userId: 'test_user_id',
          content: 'teste content 2',
          readed: true,
          created_at: Date.now(),
          updated_at: Date.now(),
          deleted_at: null,
        },
      ],
    };

    const response = await setNonReadMessageChatRoomToReadedService.execute({
      chatRoomId: 'test_id',
      messageId: 'test_id_message',
    });

    expect(response).toEqual(mockResponse);
  });
});
