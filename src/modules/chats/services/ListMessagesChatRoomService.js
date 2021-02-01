class ListMessagesChatRoomService {
  constructor({ chatRoomsRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ ticketId }) {
    const chatRoom = await this.chatRoomsRepository.findChatRoomByTicketId({
      ticketId,
    });

    return { messages: chatRoom ? chatRoom.messages : null };
  }
}

module.exports = ListMessagesChatRoomService;
