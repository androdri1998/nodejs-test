const mongoose = require('mongoose');
const mongoDbConfig = require('../../../config/mongodb');

mongoose.connect(mongoDbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
