const HTTPStatusCodes = require('http-status-codes');

const CreateChatRoomService = require('../../../services/CreateChatRoomService');
const ListChatRoomService = require('../../../services/ListChatRoomService');

class ChatRoomsController {
  constructor({ chatRoomsRepository, ticketRepository, userRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;
    this.ticketRepository = ticketRepository;
    this.userRepository = userRepository;

    this.store = this.store.bind(this);
    this.index = this.index.bind(this);
  }

  async index(req, res) {
    const { userId, limit, offset, term } = req.query;

    const listChatRoomService = new ListChatRoomService({
      chatRoomsRepository: this.chatRoomsRepository,
      userRepository: this.userRepository,
    });

    const response = await listChatRoomService.execute({
      userId,
      limit,
      offset,
      term,
    });

    return res.status(HTTPStatusCodes.StatusCodes.OK).json(response);
  }

  async store(req, res) {
    const {
      ticket_id: ticketId,
      description,
      permalink,
      permission,
      participants,
    } = req.body;

    const createChatRoomService = new CreateChatRoomService({
      chatRoomsRepository: this.chatRoomsRepository,
      ticketRepository: this.ticketRepository,
    });

    const response = await createChatRoomService.execute({
      ticketId,
      description,
      permalink,
      permission,
      participants,
    });

    return res.status(HTTPStatusCodes.StatusCodes.CREATED).json(response);
  }
}

module.exports = ChatRoomsController;
