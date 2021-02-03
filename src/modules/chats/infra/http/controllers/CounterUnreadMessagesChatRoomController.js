const HTTPStatusCodes = require('http-status-codes');

const CounterUnreadMessagesChatRoomService = require('../../../services/CounterUnreadMessagesChatRoomService');

class CounterUnreadMessagesChatRoomController {
  constructor({ chatRoomsRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;

    this.index = this.index.bind(this);
  }

  async index(req, res) {
    const { chat_room_id: chatRoomId } = req.params;

    const counterUnreadMessagesChatRoomService = new CounterUnreadMessagesChatRoomService(
      {
        chatRoomsRepository: this.chatRoomsRepository,
      },
    );

    const response = await counterUnreadMessagesChatRoomService.execute({
      chatRoomId,
    });

    return res.status(HTTPStatusCodes.StatusCodes.OK).json(response);
  }
}

module.exports = CounterUnreadMessagesChatRoomController;
