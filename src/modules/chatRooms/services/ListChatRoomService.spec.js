const ListChatRoomService = require('./ListChatRoomService');
const AppError = require('../../../shared/errors/AppError');
const FakeChatRoomsRepository = require('../infra/mongoose/repositories/ChatRoomsRepository/fakes/FakeChatRoomsRepository');
const FakeUserRepository = require('../../users/infra/mongoose/repositories/UserRepository/fakes/FakeUserRepository');

let fakeChatRoomsRepository;
let fakeUserRepository;
let listChatRoomService;

describe('ListChatRoomService', () => {
  beforeEach(() => {
    fakeChatRoomsRepository = new FakeChatRoomsRepository({ connection: null });
    fakeUserRepository = new FakeUserRepository({ connection: null });
    listChatRoomService = new ListChatRoomService({
      chatRoomsRepository: fakeChatRoomsRepository,
      userRepository: fakeUserRepository,
    });
  });

  it('should be able to list chat rooms with user profile admin', async () => {
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

    const chatRoom1 = {
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

    const chatRoom2 = {
      deleted_at: null,
      _id: 'test_id2',
      ticketId: 'ticket_id2',
      description: 'test description 2',
      permalink: 'image2.jpg',
      permission: 'admin',
      participants: [
        {
          _id: 'test_id_generate2',
          userId: 'test_user_id2',
        },
      ],
      messages: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    const chatRoom3 = {
      deleted_at: null,
      _id: 'test_id3',
      ticketId: 'ticket_id3',
      description: 'test description 3',
      permalink: 'image3.jpg',
      permission: 'admin',
      participants: [
        {
          _id: 'test_id_generate3',
          userId: 'test_user_id3',
        },
      ],
      messages: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    await fakeChatRoomsRepository.saveChatRoom({ chatRoom: chatRoom1 });
    await fakeChatRoomsRepository.saveChatRoom({ chatRoom: chatRoom2 });
    await fakeChatRoomsRepository.saveChatRoom({ chatRoom: chatRoom3 });

    const chatRooms = await listChatRoomService.execute({
      userId: 'c177529b-f7da-4ccb-a4bb-c7212620628a',
      limit: 2,
      offset: 0,
      term: 'test_id3',
    });

    await expect(chatRooms.length).toBe(1);
  });

  it('should be able to list chat rooms with user profile normal', async () => {
    const user = {
      _id: 'c177529b-f7da-4ccb-a4bb-c7212620628a',
      username: 'john doe',
      password: '123456',
      profile: 'normal',
      created_at: Date.now(),
      updated_at: Date.now(),
      deleted_at: null,
    };

    await fakeUserRepository.saveUser({ user });

    const chatRoom1 = {
      deleted_at: null,
      _id: 'test_id',
      ticketId: 'ticket_id',
      description: 'test description',
      permalink: 'image.jpg',
      permission: 'normal',
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

    const chatRoom2 = {
      deleted_at: null,
      _id: 'test_id2',
      ticketId: 'ticket_id2',
      description: 'test description 2',
      permalink: 'image2.jpg',
      permission: 'admin',
      participants: [
        {
          _id: 'test_id_generate2',
          userId: 'test_user_id2',
        },
      ],
      messages: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    const chatRoom3 = {
      deleted_at: null,
      _id: 'test_id3',
      ticketId: 'ticket_id3',
      description: 'test description 3',
      permalink: 'image3.jpg',
      permission: 'admin',
      participants: [
        {
          _id: 'test_id_generate3',
          userId: 'test_user_id3',
        },
      ],
      messages: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    await fakeChatRoomsRepository.saveChatRoom({ chatRoom: chatRoom1 });
    await fakeChatRoomsRepository.saveChatRoom({ chatRoom: chatRoom2 });
    await fakeChatRoomsRepository.saveChatRoom({ chatRoom: chatRoom3 });

    const chatRooms = await listChatRoomService.execute({
      userId: 'c177529b-f7da-4ccb-a4bb-c7212620628a',
      limit: 2,
      offset: 0,
    });

    await expect(chatRooms.length).toBe(1);
  });

  it('should be able to list chat rooms with pagination', async () => {
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

    const chatRoom1 = {
      deleted_at: null,
      _id: 'test_id',
      ticketId: 'ticket_id',
      description: 'test description',
      permalink: 'image.jpg',
      permission: 'normal',
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

    const chatRoom2 = {
      deleted_at: null,
      _id: 'test_id2',
      ticketId: 'ticket_id2',
      description: 'test description 2',
      permalink: 'image2.jpg',
      permission: 'admin',
      participants: [
        {
          _id: 'test_id_generate2',
          userId: 'test_user_id2',
        },
      ],
      messages: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    const chatRoom3 = {
      deleted_at: null,
      _id: 'test_id3',
      ticketId: 'ticket_id3',
      description: 'test description 3',
      permalink: 'image3.jpg',
      permission: 'admin',
      participants: [
        {
          _id: 'test_id_generate3',
          userId: 'test_user_id3',
        },
      ],
      messages: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    await fakeChatRoomsRepository.saveChatRoom({ chatRoom: chatRoom1 });
    await fakeChatRoomsRepository.saveChatRoom({ chatRoom: chatRoom2 });
    await fakeChatRoomsRepository.saveChatRoom({ chatRoom: chatRoom3 });

    const chatRooms = await listChatRoomService.execute({
      userId: 'c177529b-f7da-4ccb-a4bb-c7212620628a',
      limit: 2,
      offset: 0,
    });

    await expect(chatRooms.length).toBe(2);
  });

  it('should be able to list chat rooms with offset', async () => {
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

    const chatRoom1 = {
      deleted_at: null,
      _id: 'test_id',
      ticketId: 'ticket_id',
      description: 'test description',
      permalink: 'image.jpg',
      permission: 'normal',
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

    const chatRoom2 = {
      deleted_at: null,
      _id: 'test_id2',
      ticketId: 'ticket_id2',
      description: 'test description 2',
      permalink: 'image2.jpg',
      permission: 'admin',
      participants: [
        {
          _id: 'test_id_generate2',
          userId: 'test_user_id2',
        },
      ],
      messages: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    const chatRoom3 = {
      deleted_at: null,
      _id: 'test_id3',
      ticketId: 'ticket_id3',
      description: 'test description 3',
      permalink: 'image3.jpg',
      permission: 'admin',
      participants: [
        {
          _id: 'test_id_generate3',
          userId: 'test_user_id3',
        },
      ],
      messages: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    await fakeChatRoomsRepository.saveChatRoom({ chatRoom: chatRoom1 });
    await fakeChatRoomsRepository.saveChatRoom({ chatRoom: chatRoom2 });
    await fakeChatRoomsRepository.saveChatRoom({ chatRoom: chatRoom3 });

    const chatRooms = await listChatRoomService.execute({
      userId: 'c177529b-f7da-4ccb-a4bb-c7212620628a',
      limit: 2,
      offset: 2,
    });

    await expect(chatRooms.length).toBe(1);
  });

  it('should not be able to list chat rooms without a user created', async () => {
    await expect(
      listChatRoomService.execute({
        userId: 'non-existing-user',
        limit: 10,
        offset: 0,
        term: 'test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
