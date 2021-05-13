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
    // 是否上架
    isAdded: Boolean,
    // 轮播图，如果上传了轮播图则会在首页显示
    poster: String,
  },
  { versionKey: false },
);

module.exports = Mongoose.model('Book', bookSchema);
