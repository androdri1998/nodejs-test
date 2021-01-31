class AddParticipantsChatRoomService {
  constructor({ chatRoomsRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;

    this.execute = this.execute.bind(this);
  }

  async execute() {
    return { message: 'AddParticipantsChatRoomService' };
  }
}

module.exports = AddParticipantsChatRoomService;
