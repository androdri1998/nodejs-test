const AddParticipantsChatRoomService = require('./AddParticipantsChatRoomService');
const FakeChatRoomsRepository = require('../infra/mongoose/repositories/ChatRoomsRepository/fakes/FakeChatRoomsRepository');

let fakeChatRoomsRepository;
let addParticipantsChatRoomService;

describe('AddParticipantsChatRoomService', () => {
  beforeEach(() => {
    fakeChatRoomsRepository = new FakeChatRoomsRepository({ connection: null });
    addParticipantsChatRoomService = new AddParticipantsChatRoomService({
      chatRoomsRepository: fakeChatRoomsRepository,
    });
  });
});
