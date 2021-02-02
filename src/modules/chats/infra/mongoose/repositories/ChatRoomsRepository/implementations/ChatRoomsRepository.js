const mongoose = require('mongoose');
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

  async findChatRoomById({ chatRoomId }) {
    const chatRoom = await ChatRoom.findById(chatRoomId);

    return chatRoom;
  }

  async findChatRoomByTicketId({ ticketId }) {
    const chatRoom = await ChatRoom.findOne({ ticketId });

    return chatRoom;
  }

  async addMessageChatRoom({ chatRoomId, message }) {
    const chatRoom = await ChatRoom.findById(chatRoomId);
    if (chatRoom) {
      chatRoom.messages.push(message);
      const newChatRoom = await chatRoom.save();

      return newChatRoom;
    }
    return chatRoom;
  }

  async findChatRoomsWithNonReadMessagesToUserNormal() {
    const chatRooms = await ChatRoom.find({
      permission: 'normal',
      'messages.readed': false,
    });

    return chatRooms;
  }

  async findChatRoomsWithNonReadMessages() {
    const chatRooms = await ChatRoom.find({ 'messages.readed': false });

    return chatRooms;
  }

  async setNonReadMessageChatRoomToReaded({ messageId, chatRoomId }) {
    const chatRoom = await ChatRoom.updateOne(
      { _id: chatRoomId, 'messages._id': messageId },
      {
        $set: {
          'messages.$.readed': true,
        },
      },
    );

    return chatRoom;
  }
}

module.exports = ChatRoomsRepository;
