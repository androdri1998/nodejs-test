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
});
