class ListParticipantsChatRoomService {
  constructor({ chatRoomsRepository, userRepository }) {
    this.chatRoomsRepository = chatRoomsRepository;
    this.userRepository = userRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ chatRoomId }) {
    const chatRoom = await this.chatRoomsRepository.findChatRoomById({
      chatRoomId,
    });

    const participants = await Promise.all(
      chatRoom.participants.map(async participant => {
        const participantPopulated = await this.userRepository.findUserById({
          id: participant.userId,
        });

        participantPopulated.password = undefined;

        return participantPopulated;
      }),
    );

    return { participants };
  }
}

module.exports = ListParticipantsChatRoomService;
