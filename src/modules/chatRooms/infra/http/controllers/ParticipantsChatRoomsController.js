const HTTPStatusCodes = require('http-status-codes');

const AddParticipantsChatRoomService = require('../../../services/AddParticipantsChatRoomService');
const RemoveParticipantsChatRoomService = require('../../../services/RemoveParticipantsChatRoomService');

class ParticipantsChatRoomsController {
  constructor({ chatRoomsRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;

    this.store = this.store.bind(this);
    this.destroy = this.destroy.bind(this);
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

    return res.status(HTTPStatusCodes.StatusCodes.CREATED).json(response);
  }
}

module.exports = ParticipantsChatRoomsController;
