const { AdminModel } = require('..');

const adminManager = {
  async add(name, password) {
    await AdminModel.create({name, password});
  },
  async remove(id) {
    await AdminModel.deleteOne({ _id: id });
  },
  async findById(id) {
    return await AdminModel.findById(id);
  },
  async findByIdByName(name) {
    return await AdminModel.findOne({ name });
  }
};

// adminManager.add('linfeng.kuang', '123456');
adminManager.add('root', '123456');

module.exports = adminManager;
