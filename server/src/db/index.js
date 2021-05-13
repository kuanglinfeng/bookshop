const Mongoose = require('mongoose');
const BookModel = require('./models/BookModel');
const AdminModel = require('./models/AdminModel');
const UserModel = require('./models/UserModel');
const OrderModel = require('./models/OrderModel');

Mongoose.connect('mongodb://localhost:27017/bookshop', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}).then(() => console.log('连接数据库成功'));

module.exports = { BookModel, AdminModel, UserModel, OrderModel };
