const HTTPStatusCodes = require('http-status-codes');

const ListParticipantsChatRoomService = require('../../../services/ListParticipantsChatRoomService');
const AddParticipantsChatRoomService = require('../../../services/AddParticipantsChatRoomService');
const RemoveParticipantsChatRoomService = require('../../../services/RemoveParticipantsChatRoomService');

class ParticipantsChatRoomsController {
  constructor({ chatRoomsRepository, userRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;
    this.userRepository = userRepository;

    this.index = this.index.bind(this);
    this.store = this.store.bind(this);
    this.destroy = this.destroy.bind(this);
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
    const addParticipantsChatRoomService = new AddParticipantsChatRoomService({
      chatRoomsRepository: this.chatRoomsRepository,
    });

    const response = await addParticipantsChatRoomService.execute();

    return res.status(HTTPStatusCodes.StatusCodes.CREATED).json(response);
  }

  async destroy(req, res) {
    const removeParticipantsChatRoomService = new RemoveParticipantsChatRoomService(
      {
        chatRoomsRepository: this.chatRoomsRepository,
      },
    );

    const response = await removeParticipantsChatRoomService.execute();

    return res.status(HTTPStatusCodes.StatusCodes.OK).json(response);
  }
}

module.exports = ParticipantsChatRoomsController;
