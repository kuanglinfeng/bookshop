const Express = require('express');
const serviceResponder = require('../tools/serviceResponder');
const { bookManager } = require('../db/managers');

const router = Express.Router();

router.get('/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const book = await bookManager.findById(id);
    serviceResponder.sendData(response, book);
  } catch (error) {
    serviceResponder.sendError(response, error.toString());
  }
});

router.get('/', async (request, response) => {
  try {
    const result = await bookManager.find(request.query);
    serviceResponder.sendData(response, result);
  } catch (error) {
    serviceResponder.sendError(response, error.toString());
  }
});

router.post('/', async (request, response) => {
  try {
    await bookManager.add(request.body);
    serviceResponder.sendData(response, null);
  } catch (error) {
    serviceResponder.sendError(response, error.toString());
  }
});

router.put('/:id', async (request, response) => {
  try {
    await bookManager.edit(request.params.id, request.body);
    serviceResponder.sendData(response, null);
  } catch (error) {
    serviceResponder.sendError(response, error.toString());
  }
});

router.delete('/:id', async (request, response) => {
  try {
    await bookManager.remove(request.params.id);
    serviceResponder.sendData(response, null);
  } catch (error) {
    serviceResponder.sendError(response, error.toString());
  }
});

module.exports = router;
