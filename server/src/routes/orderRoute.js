const Express = require('express');
const serviceResponder = require('../tools/serviceResponder');
const { orderManager, bookManager } = require('../db/managers');

const router = Express.Router();

router.get('/', async (request, response) => {
  try {
    const orders = await orderManager.find(request.query);
    serviceResponder.sendData(response, orders);
  } catch (error) {
    serviceResponder.sendError(response, error.toString());
  }
});

router.get('/:userId', async (request, response) => {
  try {
    const result = await orderManager.getOrdersByUser(request.params.userId);
    serviceResponder.sendData(response, result);
  } catch (error) {
    serviceResponder.sendError(response, error.toString());
  }
});

router.post('/', async (request, response) => {
  try {
    // order: { user, book, count, money, createAt, status }
    const { order } = request.body;
    const dbBook = await bookManager.findById(order.book._id);
    await bookManager.edit(order.book._id, {
      ...order.book,
      stock: dbBook.stock - order.amount,
      salesVolume: dbBook.salesVolume + order.amount,
    });
    await orderManager.add(order);
    serviceResponder.sendData(response, 'ok');
  } catch (error) {
    serviceResponder.sendError(response, error.toString());
  }
});

router.put('/:id', async (request, response) => {
  try {
    await orderManager.edit(request.params.id, request.body.order);
    serviceResponder.sendData(response, null);
  } catch (error) {
    serviceResponder.sendError(response, error.toString());
  }
});

module.exports = router;
