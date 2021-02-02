const HTTPStatusCodes = require('http-status-codes');

const ListParticipantsChatRoomService = require('../../../services/ListParticipantsChatRoomService');
const AddParticipantsChatRoomService = require('../../../services/AddParticipantsChatRoomService');

class ParticipantsChatRoomsController {
  constructor({ chatRoomsRepository, userRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;
    this.userRepository = userRepository;

    this.index = this.index.bind(this);
    this.store = this.store.bind(this);
  }

  async index(req, res) {
    const { chat_room_id: chatRoomId } = req.params;
    const listParticipantsChatRoomService = new ListParticipantsChatRoomService(
      {
        chatRoomsRepository: this.chatRoomsRepository,
        userRepository: this.userRepository,
      },
    );

    const response = await listParticipantsChatRoomService.execute({
      chatRoomId,
    });

    return res.status(HTTPStatusCodes.StatusCodes.OK).json(response);
  }

  async store(req, res) {
    const { chat_room_id: chatRoomId } = req.params;
    const { userId } = req.body;
    const addParticipantsChatRoomService = new AddParticipantsChatRoomService({
      chatRoomsRepository: this.chatRoomsRepository,
      userRepository: this.userRepository,
    });

    const response = await addParticipantsChatRoomService.execute({
      userId,
      chatRoomId,
    });

    return res.status(HTTPStatusCodes.StatusCodes.CREATED).json(response);
  }
}

module.exports = ParticipantsChatRoomsController;
