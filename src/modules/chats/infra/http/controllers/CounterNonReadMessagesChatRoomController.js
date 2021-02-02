const HTTPStatusCodes = require('http-status-codes');

const CounterNonReadMessagesChatRoomService = require('../../../services/CounterNonReadMessagesChatRoomService');

class CounterNonReadMessagesChatRoomController {
  constructor({ chatRoomsRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;

    this.index = this.index.bind(this);
  }

  async index(req, res) {
    const { chat_room_id: chatRoomId } = req.params;

    const counterNonReadMessagesChatRoomService = new CounterNonReadMessagesChatRoomService(
      {
        chatRoomsRepository: this.chatRoomsRepository,
      },
    );

    const response = await counterNonReadMessagesChatRoomService.execute({
      chatRoomId,
    });

    return res.status(HTTPStatusCodes.StatusCodes.OK).json(response);
  }
}

module.exports = CounterNonReadMessagesChatRoomController;
