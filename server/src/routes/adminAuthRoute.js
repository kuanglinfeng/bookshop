const Express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { adminManager } = require('../db/managers');
const privateKey = require('../privateKey');
const serviceResponder = require('../tools/serviceResponder');
const { adminAuth } = require('../middlewares');

const router = Express.Router();

router.post('/login', async (request, response) => {
  const { name, password } = request.body;
  const admin = await adminManager.findByName(name);
  if (!admin) {
    serviceResponder.sendError(response, '该管理员不存在');
  }
  const isPasswordCorrect = bcrypt.compareSync(password, admin.password);
  if (!isPasswordCorrect) {
    serviceResponder.sendError(response, '密码错误');
  }
  // 这个令牌发给前端存储，可以一段时间免登陆。
  const token = jwt.sign(
    {
      id: String(admin._id),
    },
    privateKey,
  );

  serviceResponder.sendData(response, token);
});

router.get('/', adminAuth, async (request, response) => {
  const { admin } = request;
  if (admin) {
    serviceResponder.sendData(response, admin);
  } else {
    serviceResponder.sendError(response, '验证失败');
  }
});

module.exports = router;
