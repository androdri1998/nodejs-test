const mongoose = require('../../../../../../../shared/infra/mongoose');
const ChatRoom = require('../../../models/ChatRoom');

class ChatRoomsRepository {
  constructor({ connection }) {
    this.connection = connection;
  }

  createChatRoom({
    ticketId,
    description,
    permalink,
    permission,
    participants = [],
  }) {
    const chatRoom = new ChatRoom({
      ticketId,
      description,
      permalink,
      permission,
      participants,
    });
    return chatRoom;
  }

  async saveChatRoom({ chatRoom }) {
    await chatRoom.save();
    return chatRoom;
  }

  async findChatRoomsToUserNormal({ offset = 0, limit = 10, term }) {
    let chatRooms = [];

    if (term) {
      const isObjectIdValid = mongoose.Types.ObjectId.isValid(term);
      if (isObjectIdValid) {
        chatRooms = await ChatRoom.find(
          { _id: term, permission: 'normal' },
          null,
        );
      } else {
        const search = new RegExp(term, 'i');
        chatRooms = await ChatRoom.find(
          { description: search, permission: 'normal' },
          null,
          {
            skip: offset,
            limit,
          },
        ).exec();
      }
    } else {
      chatRooms = await ChatRoom.find({ permission: 'normal' }, null, {
        skip: offset,
        limit,
      }).exec();
    }

    return chatRooms;
  }

  async findChatRooms({ offset = 0, limit = 10, term }) {
    let chatRooms = [];

    if (term) {
      const isObjectIdValid = mongoose.Types.ObjectId.isValid(term);
      if (isObjectIdValid) {
        chatRooms = await ChatRoom.find({ _id: term }, null);
      } else {
        const search = new RegExp(term, 'i');
        chatRooms = await ChatRoom.find({ description: search }, null, {
          skip: offset,
          limit,
        }).exec();
      }
    } else {
      chatRooms = await ChatRoom.find({}, null, {
        skip: offset,
        limit,
      }).exec();
    }

    return chatRooms;
  }
}

module.exports = ChatRoomsRepository;
