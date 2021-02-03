const HTTPStatusCodes = require('http-status-codes');

const CounterChatRoomsWithUnreadMessagesService = require('../../../services/CounterChatRoomsWithUnreadMessagesService');

class CounterChatRoomsWithUnreadMessagesController {
  constructor({ chatRoomsRepository, userRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;
    this.userRepository = userRepository;

    this.index = this.index.bind(this);
  }

  async index(req, res) {
    const { id: userId } = req.user;

    const counterChatRoomsWithUnreadMessagesService = new CounterChatRoomsWithUnreadMessagesService(
      {
        chatRoomsRepository: this.chatRoomsRepository,
        userRepository: this.userRepository,
      },
    );

    const response = await counterChatRoomsWithUnreadMessagesService.execute({
      userId,
    });

    return res.status(HTTPStatusCodes.StatusCodes.OK).json(response);
  }
}

module.exports = CounterChatRoomsWithUnreadMessagesController;
