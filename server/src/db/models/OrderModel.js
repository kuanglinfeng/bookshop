const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: Object,
    },
    book: {
      type: Object,
    },
    amount: {
      type: Number,
    },
    money: {
      type: Number,
    },
    createAt: {
      type: String,
    },
    // 已支付 1，已完成 2，取消 3
    status: {
      type: Number,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('Order', OrderSchema);
