const serviceResponder = {
  sendData(response, data) {
    response.send({ status: 0, message: 'ok', data });
  },
  sendError(response, error) {
    response.send({ status: 1, message: error, data: null });
  },
};

module.exports = serviceResponder;
