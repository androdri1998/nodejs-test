class CounterNonReadMessagesChatRoomService {
  constructor({ chatRoomsRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ chatRoomId }) {
    const chatRoom = await this.chatRoomsRepository.findChatRoomById({
      chatRoomId,
    });

    const messages = chatRoom.messages.filter(message => !message.readed);

    return {
      amount_non_read_messages_chat_room: messages.length,
    };
  }
}

module.exports = CounterNonReadMessagesChatRoomService;
