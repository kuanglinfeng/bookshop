const { OrderModel } = require('..');

const orderManager = {
  async add(order) {
    await OrderModel.create(order);
  },
  async remove(id) {
    await OrderModel.deleteOne({ _id: id });
  },
  async edit(id, newOrder) {
    await OrderModel.updateOne({ _id: id }, newOrder);
  },
  async findById(id) {
    return await OrderModel.findById(id);
  },
  async getOrdersByUser(userId) {
    return await OrderModel.find({ 'user._id': userId });
  },
  async find({ page = 1, pageSize = 10, keywordProp = 'name', keywordValue }) {
    let orders = [];
    let count = 0;
    page = Number(page);
    pageSize = Number(pageSize);
    // 忽视大小写
    const reg = new RegExp(keywordValue, 'i');
    orders = await OrderModel.find({
      // [keywordProp]: { $regex: reg },
    })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ $natural: -1 });

    count = await OrderModel.find({
      // name: { $regex: reg },
    }).countDocuments();
    return { count, orders };
  },
};

module.exports = orderManager;
