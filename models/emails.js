const mongoose = require('mongoose');

const emailSchema = mongoose.Schema({
  email: { type: String, unique: true },
  createdAt: Date,
});

module.exports = mongoose.model('Emails', emailSchema);
