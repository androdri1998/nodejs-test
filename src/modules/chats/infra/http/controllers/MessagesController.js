const HTTPStatusCodes = require('http-status-codes');

const ListMessagesChatRoomService = require('../../../services/ListMessagesChatRoomService');

class MessagesController {
  constructor({ chatRoomsRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;

    this.index = this.index.bind(this);
  }

  async index(req, res) {
    const { ticketId } = req.params;

    const listMessagesChatRoomService = new ListMessagesChatRoomService({
      chatRoomsRepository: this.chatRoomsRepository,
    });

    const response = await listMessagesChatRoomService.execute({
      ticketId,
    });

    return res.status(HTTPStatusCodes.StatusCodes.OK).json(response);
  }
}

module.exports = MessagesController;
