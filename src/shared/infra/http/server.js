require('dotenv').config({
  path: '.env',
});
require('express-async-errors');

const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const express = require('express');

require('../mongoose');

const appConfig = require('../../../config/app');
const uploadConfig = require('../../../config/upload');
const errorsMiddleware = require('./middlewares/errors');
const logRequest = require('./middlewares/logRequest');
const DebugProvider = require('../../providers/LogProvider/implementations/DebugProvider');
const ChatRoomsRepository = require('../../../modules/chats/infra/mongoose/repositories/ChatRoomsRepository/implementations/ChatRoomsRepository');
const AddMessageChatRoomService = require('../../../modules/chats/services/AddMessageChatRoomService');
const SetUnreadMessageChatRoomToReadedService = require('../../../modules/chats/services/SetUnreadMessageChatRoomToReadedService');
const routes = require('./routes');

const debugProvider = new DebugProvider('api:main');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(logRequest);

app.use('/', routes);

app.use(errorsMiddleware);

io.on('connection', socket => {
  socket.on('messageSent', async ({ userId, content, chatRoomId }) => {
    const chatRoomsRepository = new ChatRoomsRepository({
      connection: mongoose,
    });
    const addMessageChatRoomService = new AddMessageChatRoomService({
      chatRoomsRepository,
    });

    const response = await addMessageChatRoomService.execute({
      userId,
      chatRoomId,
      content,
    });

    socket.broadcast.emit('messageReceived', response);
  });

  socket.on('setMessageReaded', async ({ messageId, chatRoomId }) => {
    const chatRoomsRepository = new ChatRoomsRepository({
      connection: mongoose,
    });
    const setUnreadMessageChatRoomToReadedService = new SetUnreadMessageChatRoomToReadedService(
      {
        chatRoomsRepository,
      },
    );

    const response = await setUnreadMessageChatRoomToReadedService.execute({
      messageId,
      chatRoomId,
    });

    socket.broadcast.emit('setClientMessageReaded', response);
  });
});

server.listen(appConfig.port, () => {
  debugProvider.createLog({
    message: `Server started on port ${appConfig.port}!`,
  });
});
