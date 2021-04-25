const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    set(val) {
      return bcrypt.hashSync(val, 10)
    }
  }
}, { versionKey: false })

module.exports = mongoose.model('Admin', AdminSchema);
