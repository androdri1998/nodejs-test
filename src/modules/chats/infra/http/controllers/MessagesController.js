const HTTPStatusCodes = require('http-status-codes');

const ListMessagesChatRoomService = require('../../../services/ListMessagesChatRoomService');
const AddMessageChatRoomService = require('../../../services/AddMessageChatRoomService');

class MessagesController {
  constructor({ chatRoomsRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;

    this.index = this.index.bind(this);
    this.store = this.store.bind(this);
  }

  async store(req, res) {
    const { chat_room_id: chatRoomId } = req.params;
    const { userId, content } = req.body;

    const addMessageChatRoomService = new AddMessageChatRoomService({
      chatRoomsRepository: this.chatRoomsRepository,
    });

    const response = await addMessageChatRoomService.execute({
      userId,
      chatRoomId,
      content,
    });

    return res.status(HTTPStatusCodes.StatusCodes.OK).json(response);
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
