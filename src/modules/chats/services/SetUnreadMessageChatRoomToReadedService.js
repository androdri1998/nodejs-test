class SetUnreadMessageChatRoomToReadedService {
  constructor({ chatRoomsRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ chatRoomId, messageId }) {
    await this.chatRoomsRepository.setUnreadMessageChatRoomToReaded({
      chatRoomId,
      messageId,
    });

    const chatRoom = await this.chatRoomsRepository.findChatRoomById({
      chatRoomId,
    });

    return { messages: chatRoom.messages };
  }
}

module.exports = SetUnreadMessageChatRoomToReadedService;
