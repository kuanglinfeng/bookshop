const { BookModel } = require('..');

const bookManager = {
  async add(book) {
    await BookModel.create(book);
  },
  async remove(id) {
    await BookModel.deleteOne({ _id: id });
  },
  async edit(id, newBook) {
    await BookModel.updateOne({ _id: id }, newBook);
  },
  async findById(id) {
    return await BookModel.findById(id);
  },
  async find({ page = 1, pageSize = 10, keywordProp = 'name', keywordValue }) {
    let books = [];
    let count = 0;
    page = Number(page);
    pageSize = Number(pageSize);
    // 忽视大小写
    const reg = new RegExp(keywordValue, 'i');
    if (keywordProp === 'types') {
      books = await BookModel.find({
        types: { $in: [reg] },
      })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ $natural: -1 });

      count = await BookModel.find({
        types: { $in: [reg] },
      }).countDocuments();
    } else {
      books = await BookModel.find({
        [keywordProp]: { $regex: reg },
      })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ $natural: -1 });

      count = await BookModel.find({
        name: { $regex: reg },
      }).countDocuments();
    }
    return { count, books };
  },
  async getCarouselBooks() {
    return await BookModel.find({ poster: { $ne: null },  isAdded: true });
  },
  async getAll() {
    return await BookModel.find({ isAdded: true });
  },
};

module.exports = bookManager;
