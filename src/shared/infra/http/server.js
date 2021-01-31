require('dotenv').config({
  path: '.env',
});
require('express-async-errors');

const cors = require('cors');
const express = require('express');

// eslint-disable-next-line no-unused-vars
const mongoose = require('../mongoose');
const appConfig = require('../../../config/app');
const uploadConfig = require('../../../config/upload');
const errorsMiddleware = require('./middlewares/errors');
const logRequest = require('./middlewares/logRequest');
const DebugProvider = require('../../providers/LogProvider/implementations/DebugProvider');
const routes = require('./routes');

const debugProvider = new DebugProvider('api:main');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(logRequest);

app.use('/', routes);

app.use(errorsMiddleware);

app.listen(appConfig.port, () => {
  debugProvider.createLog({
    message: `Server started on port ${appConfig.port}!`,
  });
});
