const jwt = require('jsonwebtoken');
const { userManager } = require('../db/managers');
const privateKey = require('../privateKey');

const userAuth = async (request, response, next) => {
  const token = String(request.headers.authorization).split(' ').pop();
  try {
    // 用token和秘钥进行解密 得到用户的id
    const decoded = jwt.verify(token, privateKey);
    request.user = await userManager.findById(decoded.id);
  } catch (err) {
    request.user = null;
  }
  next();
};

module.exports = userAuth;
