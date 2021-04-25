const jwt = require('jsonwebtoken');
const { adminManager } = require('../db/managers');
const privateKey = require('../privateKey');

const adminAuth = async (request, response, next) => {
  const token = String(request.headers.authorization).split(' ').pop();
  try {
    // 用token和秘钥进行解密 得到用户的id
    const decoded = jwt.verify(token, privateKey);
    request.admin = await adminManager.findById(decoded.id);
  } catch(err) {
    request.admin = null;
  }
  next();
}

module.exports = adminAuth;