const RemoveParticipantsChatRoomService = require('./RemoveParticipantsChatRoomService');
const FakeChatRoomsRepository = require('../infra/mongoose/repositories/ChatRoomsRepository/fakes/FakeChatRoomsRepository');

let fakeChatRoomsRepository;
let removeParticipantsChatRoomService;

describe('RemoveParticipantsChatRoomService', () => {
  beforeEach(() => {
    fakeChatRoomsRepository = new FakeChatRoomsRepository({ connection: null });
    removeParticipantsChatRoomService = new RemoveParticipantsChatRoomService({
      chatRoomsRepository: fakeChatRoomsRepository,
    });
  });
});
