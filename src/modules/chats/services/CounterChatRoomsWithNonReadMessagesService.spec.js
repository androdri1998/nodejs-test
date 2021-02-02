const CounterChatRoomsWithNonReadMessagesService = require('./CounterChatRoomsWithNonReadMessagesService');
const FakeChatRoomsRepository = require('../infra/mongoose/repositories/ChatRoomsRepository/fakes/FakeChatRoomsRepository');
const FakeUserRepository = require('../../users/infra/mongoose/repositories/UserRepository/fakes/FakeUserRepository');

let fakeChatRoomsRepository;
let fakeUserRepository;
let counterChatRoomsWithNonReadMessagesService;

describe('CounterChatRoomsWithNonReadMessagesService', () => {
  beforeEach(() => {
    fakeChatRoomsRepository = new FakeChatRoomsRepository({ connection: null });
    fakeUserRepository = new FakeUserRepository({ connection: null });
    counterChatRoomsWithNonReadMessagesService = new CounterChatRoomsWithNonReadMessagesService(
      {
        chatRoomsRepository: fakeChatRoomsRepository,
        userRepository: fakeUserRepository,
      },
    );
  });

  it('should be able to list counter of chat rooms with non-read-messages', async () => {
    const user = {
      _id: 'c177529b-f7da-4ccb-a4bb-c7212620628a',
      username: 'john doe',
      password: '123456',
      profile: 'admin',
      created_at: Date.now(),
      updated_at: Date.now(),
      deleted_at: null,
    };

    await fakeUserRepository.saveUser({ user });

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

    const response = await counterChatRoomsWithNonReadMessagesService.execute({
      userId: 'c177529b-f7da-4ccb-a4bb-c7212620628a',
    });

    expect(response.amount_chat_rooms_with_non_read_messages).toBe(1);
  });
});
