const { UserModel } = require('..');

const userManager = {
  async add(user) {
    await UserModel.create(user);
  },
  async remove(id) {
    await UserModel.deleteOne({ _id: id });
  },
  async findById(id) {
    return await UserModel.findById(id);
  },
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  },
  async edit(id, newUser) {
    await UserModel.updateOne({ _id: id }, newUser);
  },
  async getPocket(userId) {
    const user = await this.findById(userId);
    return user.bookPocket ? user.bookPocket : [];
  },
  async addBookToPocket({ userId, book, amount }) {
    const user = await this.findById(userId);
    if (!user.bookPocket) {
      user.bookPocket = [{ book, amount }];
      await this.edit(userId, user);
      return;
    }
    const index = user.bookPocket.findIndex((item) => item.book._id === book._id);
    if (index !== -1) {
      user.bookPocket[index].amount += amount;
    } else {
      user.bookPocket.push({ book, amount });
    }
    await this.edit(userId, user);
  },
  async deleteBookFromPocket({ userId, bookId, amount }) {
    const user = await this.findById(userId);
    const index = user.bookPocket.findIndex((item) => item.book._id === bookId);
    if (index === -1) return;
    const newAmount = user.bookPocket[index].amount - amount;
    if (newAmount <= 0) {
      user.bookPocket.splice(index, 1);
    } else {
      user.bookPocket[index].amount = newAmount;
    }
    await this.edit(userId, user);
  },
};

module.exports = userManager;
