/* eslint-disable radix */
const HTTPStatusCodes = require('http-status-codes');

const AppError = require('../../../shared/errors/AppError');

class ListChatRoomService {
  constructor({ chatRoomsRepository, userRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;
    this.userRepository = userRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ userId, limit, offset, term }) {
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
      chatRooms = await this.chatRoomsRepository.findChatRoomsToUserNormal({
        offset: parseInt(offset),
        limit: parseInt(limit),
        term,
      });
    } else {
      chatRooms = await this.chatRoomsRepository.findChatRooms({
        offset: parseInt(offset),
        limit: parseInt(limit),
        term,
      });
    }

    return { chat_rooms: chatRooms };
  }
}

module.exports = ListChatRoomService;
