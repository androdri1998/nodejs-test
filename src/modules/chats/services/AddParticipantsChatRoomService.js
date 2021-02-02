const HTTPStatusCodes = require('http-status-codes');

const AppError = require('../../../shared/errors/AppError');

class AddParticipantsChatRoomService {
  constructor({ chatRoomsRepository, userRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;
    this.userRepository = userRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ userId, chatRoomId }) {
    const user = await this.userRepository.findUserById({
      id: userId,
    });

    if (!user) {
      throw new AppError(
        'User not found',
        HTTPStatusCodes.StatusCodes.NOT_FOUND,
      );
    }

    const chatRoom = await this.chatRoomsRepository.addParticipantChatRoom({
      chatRoomId,
      user: { userId },
    });

    return { participants: chatRoom.participants };
  }
}

module.exports = AddParticipantsChatRoomService;
