const Express = require('express');
const serviceResponder = require('../tools/serviceResponder');
const { userManager } = require('../db/managers');

const router = Express.Router();

router.get('/book_pocket/:user_id', async (request, response) => {
  try {
    const pocket = await userManager.getPocket(request.params.user_id);
    serviceResponder.sendData(response, pocket);
  } catch (error) {
    serviceResponder.sendError(response, error.toString());
  }
});

router.post('/book_pocket', async (request, response) => {
  try {
    // body: {userId, book, amount}
    await userManager.addBookToPocket(request.body);
    serviceResponder.sendData(response, 'ok');
  } catch (error) {
    serviceResponder.sendError(response, error.toString());
  }
});

router.delete('/book_pocket', async (request, response) => {
  try {
    // query: {userId, bookId, amount}
    await userManager.deleteBookFromPocket(request.query);
    serviceResponder.sendData(response, 'ok');
  } catch (error) {
    serviceResponder.sendError(response, error.toString());
  }
});

module.exports = router;
