const AppError = require('../../../shared/errors/AppError');
const AddParticipantsChatRoomService = require('./AddParticipantsChatRoomService');
const FakeChatRoomsRepository = require('../infra/mongoose/repositories/ChatRoomsRepository/fakes/FakeChatRoomsRepository');
const FakeUserRepository = require('../../users/infra/mongoose/repositories/UserRepository/fakes/FakeUserRepository');

let fakeChatRoomsRepository;
let fakeUserRepository;
let addParticipantsChatRoomService;

describe('AddParticipantsChatRoomService', () => {
  beforeEach(() => {
    fakeChatRoomsRepository = new FakeChatRoomsRepository({ connection: null });
    fakeUserRepository = new FakeUserRepository({ connection: null });
    addParticipantsChatRoomService = new AddParticipantsChatRoomService({
      chatRoomsRepository: fakeChatRoomsRepository,
      userRepository: fakeUserRepository,
    });
  });

  it('should be able to add participant on chat room', async () => {
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
      messages: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    await fakeChatRoomsRepository.saveChatRoom({ chatRoom });

    const { participants } = await addParticipantsChatRoomService.execute({
      userId: 'c177529b-f7da-4ccb-a4bb-c7212620628a',
      chatRoomId: 'test_id',
    });

    expect(participants.length).toBe(2);
  });

  it('should not be able to add participant on chat room with a non-existing-user', async () => {
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

    await expect(
      addParticipantsChatRoomService.execute({
        userId: 'non-existing-user',
        chatRoomId: 'test_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
