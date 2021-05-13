const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      set(val) {
        return bcrypt.hashSync(val, 10);
      },
    },
    // [{book, count}]
    bookPocket: [Object],
  },
  { versionKey: false },
);

module.exports = mongoose.model('User', UserSchema);
