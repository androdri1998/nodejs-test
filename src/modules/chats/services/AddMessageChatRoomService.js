class AddMessageChatRoomService {
  constructor({ chatRoomsRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ userId, chatRoomId, content }) {
    const chatRoom = await this.chatRoomsRepository.addMessageChatRoom({
      chatRoomId,
      message: {
        userId,
        content,
      },
    });

    return { messages: chatRoom ? chatRoom.messages : [] };
  }
}

module.exports = AddMessageChatRoomService;
