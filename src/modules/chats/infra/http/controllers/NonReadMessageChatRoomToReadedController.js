const HTTPStatusCodes = require('http-status-codes');

const SetNonReadMessageChatRoomToReadedService = require('../../../services/SetNonReadMessageChatRoomToReadedService');

class NonReadMessageChatRoomToReadedController {
  constructor({ chatRoomsRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;

    this.store = this.store.bind(this);
  }

  async update(req, res) {
    const { chat_room_id: chatRoomId, message_id: messageId } = req.query;

    const setNonReadMessageChatRoomToReadedService = new SetNonReadMessageChatRoomToReadedService(
      {
        chatRoomsRepository: this.chatRoomsRepository,
      },
    );

    const response = await setNonReadMessageChatRoomToReadedService.execute({
      chatRoomId,
      messageId,
    });

    return res.status(HTTPStatusCodes.StatusCodes.OK).json(response);
  }
}

module.exports = NonReadMessageChatRoomToReadedController;
