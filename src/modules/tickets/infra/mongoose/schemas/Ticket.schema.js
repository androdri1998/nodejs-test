const mongoose = require('mongoose');

const { Schema } = mongoose;

const Ticket = new Schema(
  {
    title: String,
    description: String,
    permalink: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
  },
  { strict: false },
);

module.exports = Ticket;
