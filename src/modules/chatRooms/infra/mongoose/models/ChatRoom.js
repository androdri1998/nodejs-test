const mongoose = require('../../../../../shared/infra/mongoose');
const ChatRoomSchema = require('../schemas/ChatRoom.schema');

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);

module.exports = ChatRoom;
