const bookManager = require('../db/managers/bookManager');

const addTestData = () => {
  for (let i = 0; i < 100; i++) {
    const name = `书名${i + 1}`;
    const introduce = `介绍${i + 1}`;
    const author = `作者${i + 1}`;
    const publisher = `书名${i + 1}`;
    const publishDate = new Date();
    const pages = i + 1;
    const types = ['类别1', '类别2'];
    const coverImage = `封面图${i + 1}`;
    const price = i + 1;
    const discountPrice = i + 1;
    const stock = i + 1;
    const salesVolume = i + 1;
    bookManager.add({
      name,
      introduce,
      author,
      publisher,
      publishDate,
      pages,
      types,
      coverImage,
      price,
      discountPrice,
      stock,
      salesVolume,
    });
  }
};

module.exports = addTestData;
