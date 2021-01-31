/* eslint-disable no-underscore-dangle */
const ListParticipantsChatRoomService = require('./ListParticipantsChatRoomService');
const FakeChatRoomsRepository = require('../infra/mongoose/repositories/ChatRoomsRepository/fakes/FakeChatRoomsRepository');
const FakeUserRepository = require('../../users/infra/mongoose/repositories/UserRepository/fakes/FakeUserRepository');

let fakeChatRoomsRepository;
let fakeUserRepository;
let listParticipantsChatRoomService;

describe('RemoveParticipantsChatRoomService', () => {
  beforeEach(() => {
    fakeChatRoomsRepository = new FakeChatRoomsRepository({ connection: null });
    fakeUserRepository = new FakeUserRepository({ connection: null });
    listParticipantsChatRoomService = new ListParticipantsChatRoomService({
      chatRoomsRepository: fakeChatRoomsRepository,
      userRepository: fakeUserRepository,
    });
  });

  it("should be able to list chat rooms' participants with user profile admin", async () => {
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

    const user1 = {
      _id: '40ad77e0-2e5a-4865-a8c7-6cd2b3c85ee4',
      username: 'john doe test',
      password: '123456',
      profile: 'normal',
      created_at: Date.now(),
      updated_at: Date.now(),
      deleted_at: null,
    };

    await fakeUserRepository.saveUser({ user });
    await fakeUserRepository.saveUser({ user: user1 });

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
          userId: user._id,
        },
        {
          _id: 'test_id_generate1',
          userId: user1._id,
        },
      ],
      messages: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    await fakeChatRoomsRepository.saveChatRoom({ chatRoom });

    const participantsResponse = await listParticipantsChatRoomService.execute({
      chatRoomId: chatRoom._id,
    });

    await expect(participantsResponse.participants.length).toBe(2);
  });
});
