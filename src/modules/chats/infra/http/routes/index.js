const { Router } = require('express');

const chatRoomsRoutes = require('./chatRooms.routes');
const messagesRoutes = require('./messages.routes');
const participantsRoutes = require('./participants.routes');

const chatsRoutes = Router();

chatsRoutes.use('/', chatRoomsRoutes);
chatsRoutes.use('/', messagesRoutes);
chatsRoutes.use('/', participantsRoutes);

module.exports = chatsRoutes;
