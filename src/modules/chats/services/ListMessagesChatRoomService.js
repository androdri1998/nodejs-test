class ListMessagesChatRoomService {
  constructor({ chatRoomsRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;

    this.execute = this.execute.bind(this);
  }

  async execute() {
    return { message: 'ListMessagesChatRoomService' };
  }
}

module.exports = ListMessagesChatRoomService;
