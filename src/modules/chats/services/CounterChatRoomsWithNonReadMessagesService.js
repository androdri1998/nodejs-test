const HTTPStatusCodes = require('http-status-codes');
const AppError = require('../../../shared/errors/AppError');

class CounterChatRoomsWithNonReadMessagesService {
  constructor({ chatRoomsRepository, userRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;
    this.userRepository = userRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ userId }) {
    const user = await this.userRepository.findUserById({
      id: userId,
    });

    if (!user) {
      throw new AppError(
        'User not found',
        HTTPStatusCodes.StatusCodes.NOT_FOUND,
      );
    }

    let chatRooms = [];
    if (user.profile === 'normal') {
      chatRooms = await this.chatRoomsRepository.findChatRoomsWithNonReadMessagesToUserNormal();
    } else {
      chatRooms = await this.chatRoomsRepository.findChatRoomsWithNonReadMessages();
    }

    return { amount_chat_rooms_with_non_read_messages: chatRooms.length };
  }
}

module.exports = CounterChatRoomsWithNonReadMessagesService;
