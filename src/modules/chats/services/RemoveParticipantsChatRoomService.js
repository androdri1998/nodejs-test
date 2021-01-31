class RemoveParticipantsChatRoomService {
  constructor({ chatRoomsRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;

    this.execute = this.execute.bind(this);
  }

  async execute() {
    return { message: 'RemoveParticipantsChatRoomService' };
  }
}

module.exports = RemoveParticipantsChatRoomService;
