const mongoose = require('../../../../../shared/infra/mongoose');

const { Schema } = mongoose;

const ChatRoom = new Schema({
  ticketId: Schema.Types.ObjectId,
  description: String,
  permalink: String,
  permission: String,
  participants: [
    {
      userId: Schema.Types.ObjectId,
    },
  ],
  messages: [
    {
      userId: Schema.Types.ObjectId,
      content: String,
      readed: { type: Date, default: false },
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now },
      deleted_at: { type: Date, default: null },
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

module.exports = ChatRoom;
