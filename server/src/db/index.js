const Mongoose = require('mongoose');
const BookModel = require('./models/BookModel');

Mongoose.connect('mongodb://localhost:27017/bookshop', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}).then(() => console.log('连接数据库成功'));

module.exports = { BookModel };
