const Express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userManager } = require('../db/managers');
const privateKey = require('../privateKey');
const serviceResponder = require('../tools/serviceResponder');
const { userAuth } = require('../middlewares');

const router = Express.Router();

router.post('/register', async (request, response) => {
  const { email, password, name } = request.body;
  const user = await userManager.findByEmail(email);
  if (user) {
    serviceResponder.sendError(response, '该邮箱已被注册！');
    return;
  }
  try {
    await userManager.add(request.body);
    serviceResponder.sendData(response, '注册成功！');
  } catch {
    serviceResponder.sendError(response, '注册失败！');
  }
});

router.post('/login', async (request, response) => {
  const { email, password } = request.body;
  const user = await userManager.findByEmail(email);
  if (!user) {
    serviceResponder.sendError(response, '该用户不存在！');
    return;
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    serviceResponder.sendError(response, '密码错误！');
  }
  // 这个令牌发给前端存储，可以一段时间免登陆。
  const token = jwt.sign(
    {
      id: String(user._id),
    },
    privateKey,
  );

  serviceResponder.sendData(response, { user, token });
});

router.get('/', userAuth, async (request, response) => {
  const { user } = request;
  if (user) {
    serviceResponder.sendData(response, { user });
  } else {
    serviceResponder.sendError(response, '验证失败！');
  }
});

router.put('/:userId', async (request, response) => {
  try {
    await userManager.edit(request.params.userId, request.body.user);
    serviceResponder.sendData(response, '修改成功！');
  } catch {
    serviceResponder.sendError(response, '修改失败！');
  }
});

module.exports = router;
