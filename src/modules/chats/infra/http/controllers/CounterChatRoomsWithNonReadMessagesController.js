const HTTPStatusCodes = require('http-status-codes');

const CounterChatRoomsWithNonReadMessagesService = require('../../../services/CounterChatRoomsWithNonReadMessagesService');

class CounterChatRoomsWithNonReadMessagesController {
  constructor({ chatRoomsRepository, userRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;
    this.userRepository = userRepository;

    this.index = this.index.bind(this);
  }

  async index(req, res) {
    const { id: userId } = req.user;

    const counterChatRoomsWithNonReadMessagesService = new CounterChatRoomsWithNonReadMessagesService(
      {
        chatRoomsRepository: this.chatRoomsRepository,
        userRepository: this.userRepository,
      },
    );

    const response = await counterChatRoomsWithNonReadMessagesService.execute({
      userId,
    });

    return res.status(HTTPStatusCodes.StatusCodes.OK).json(response);
  }
}

module.exports = CounterChatRoomsWithNonReadMessagesController;
