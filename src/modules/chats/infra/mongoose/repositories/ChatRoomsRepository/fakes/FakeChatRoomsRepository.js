/* eslint-disable no-underscore-dangle */
const { v4: uuidV4 } = require('uuid');

class FakeChatRoomsRepository {
  constructor({ connection }) {
    this.connection = connection;

    this.chatRooms = [];
  }

  createChatRoom({
    ticketId,
    description,
    permalink,
    permission,
    participants = [],
  }) {
    const chatRoom = {
      _id: uuidV4(),
      ticketId,
      description,
      permalink,
      permission,
      participants,
      messages: [],
      created_at: Date.now(),
      updated_at: Date.now(),
      deleted_at: null,
    };

    return chatRoom;
  }

  async saveChatRoom({ chatRoom }) {
    this.chatRooms.push(chatRoom);
    return chatRoom;
  }

  async findChatRoomsToUserNormal({ offset = 0, limit = 10, term }) {
    const chatRooms = this.chatRooms
      .filter(
        chatRoom =>
          // eslint-disable-next-line no-underscore-dangle
          (term && (chatRoom.description === term || chatRoom._id === term)) ||
          chatRoom.permission === 'normal',
      )
      .slice(offset, offset + limit);

    return chatRooms;
  }

  async findChatRooms({ offset = 0, limit = 10, term }) {
    const chatRooms = this.chatRooms
      .filter(
        chatRoom =>
          (term && (chatRoom.description === term || chatRoom._id === term)) ||
          (!term && chatRoom._id),
      )
      .slice(offset, offset + limit);

    return chatRooms;
  }

  async findChatRoomById({ chatRoomId }) {
    const chatRoom = this.chatRooms.find(
      chatRoomFind => chatRoomFind._id === chatRoomId,
    );
    return chatRoom || null;
  }

  async findChatRoomByTicketId({ ticketId }) {
    const chatRoom = this.chatRooms.find(
      chatRoomFind => chatRoomFind.ticketId === ticketId,
    );
    return chatRoom || null;
  }

  async addMessageChatRoom({ chatRoomId, message }) {
    const newMessage = {
      _id: uuidV4(),
      userId: message.userId,
      content: message.content,
      readed: false,
      created_at: Date.now(),
      updated_at: Date.now(),
      deleted_at: null,
    };
    const chatRoom = this.chatRooms.find(
      chatRoomFind => chatRoomFind._id === chatRoomId,
    );

    chatRoom.messages.push(newMessage);

    const newChatRooms = this.chatRooms.filter(
      chatRoomFind => chatRoomFind._id !== chatRoomId,
    );

    newChatRooms.push(chatRoom);

    this.chatRooms = newChatRooms;

    return chatRoom;
  }
}

module.exports = FakeChatRoomsRepository;
