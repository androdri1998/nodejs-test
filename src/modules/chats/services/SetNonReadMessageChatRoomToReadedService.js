class SetNonReadMessageChatRoomToReadedService {
  constructor({ chatRoomsRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ chatRoomId, messageId }) {
    await this.chatRoomsRepository.setNonReadMessageChatRoomToReaded({
      chatRoomId,
      messageId,
    });

    const chatRoom = await this.chatRoomsRepository.findChatRoomById({
      chatRoomId,
    });

    return { messages: chatRoom.messages };
  }
}

module.exports = SetNonReadMessageChatRoomToReadedService;
