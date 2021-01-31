const HTTPStatusCodes = require('http-status-codes');

const AppError = require('../../../shared/errors/AppError');

class CreateChatRoomService {
  constructor({ chatRoomsRepository, ticketRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;
    this.ticketRepository = ticketRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({
    ticketId,
    description,
    permalink,
    permission,
    participants = [],
  }) {
    const ticket = await this.ticketRepository.findTicketById({
      ticketId,
    });

    if (!ticket) {
      throw new AppError(
        "Can't create a new chat room to this ticket, ticket was not found",
        HTTPStatusCodes.StatusCodes.NOT_FOUND,
      );
    }

    let chatRoom = this.chatRoomsRepository.createChatRoom({
      ticketId,
      description,
      permalink,
      permission,
      participants,
    });

    chatRoom = await this.chatRoomsRepository.saveChatRoom({ chatRoom });
    return chatRoom;
  }
}

module.exports = CreateChatRoomService;
