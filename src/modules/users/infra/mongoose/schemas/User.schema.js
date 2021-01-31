const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  username: String,
  password: String,
  profile: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

module.exports = User;
