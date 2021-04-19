const Express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const serviceResponder = require('../tools/serviceResponder');

const router = Express.Router();

const uploadDir = path.resolve(__dirname, '../../public/upload');

// 文件保存的配置
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: function (request, file, callback) {
    // 文件名
    const time = new Date().getTime();
    // 后缀名
    const extName = path.extname(file.originalname);
    callback(null, `${time}${extName}`);
  },
});

const allowExtensions = ['.jpeg', '.jpg', '.png', '.gif'];

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 最多10M
  },
  fileFilter(request, file, callback) {
    const extName = path.extname(file.originalname);
    if (allowExtensions.includes(extName)) {
      callback(null, true);
    } else {
      callback(new Error('文件类型不正确'));
    }
  },
  // 发送的文件的key名必须叫 imageFile
}).single('imageFile');

router.post('/', (request, response) => {
  upload(request, response, (error) => {
    if (error) {
      serviceResponder.sendError(response, error.message);
    } else {
      const fileName = request.file.filename;
      serviceResponder.sendData(response, fileName);
    }
  });
});

// 获取上传的所有文件
router.get('/', (request, response) => {
  const files = fs.readdirSync(uploadDir);
  serviceResponder.sendData(response, files);
});

// 删除某个文件
router.delete('/:id', (request, response) => {
  fs.unlink(`${uploadDir}/${request.params.id}`, (err) => {
    if (err) {
      serviceResponder.sendError(response, '文件名错误');
    } else {
      serviceResponder.sendData(response, true);
    }
  });
});

module.exports = router;
