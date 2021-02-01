/* eslint-disable no-console */
require('dotenv').config({
  path: '.env',
});
require('express-async-errors');

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
  socket.on('messageSent', ({ userId, message }) => {
    console.log({ userId, message });

    socket.broadcast.emit('messageReceived', { userId, message });
  });

  socket.on('setMessageReaded', ({ messageId }) => {
    console.log({ messageId });

    socket.broadcast.emit('setClientMessageReaded', { messageId });
  });
});

server.listen(appConfig.port, () => {
  debugProvider.createLog({
    message: `Server started on port ${appConfig.port}!`,
  });
});
