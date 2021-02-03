const HTTPStatusCodes = require('http-status-codes');
const AppError = require('../../../shared/errors/AppError');

class CounterChatRoomsWithUnreadMessagesService {
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
      chatRooms = await this.chatRoomsRepository.findChatRoomsWithUnreadMessagesToUserNormal();
    } else {
      chatRooms = await this.chatRoomsRepository.findChatRoomsWithUnreadMessages();
    }

    return { amount_chat_rooms_with_unread_messages: chatRooms.length };
  }
}

module.exports = CounterChatRoomsWithUnreadMessagesService;
