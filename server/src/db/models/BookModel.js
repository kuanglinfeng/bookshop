const Mongoose = require('mongoose');

const bookSchema = new Mongoose.Schema(
  {
    // 运行时的类型
    name: String,
    introduce: String,
    author: String,
    publisher: String,
    publishDate: String,
    pages: Number,
    types: [String],
    coverImage: String,
    price: Number,
    discountPrice: Number,
    stock: Number,
    salesVolume: Number,
  },
  { versionKey: false },
);

module.exports = Mongoose.model('Book', bookSchema);
