const Express = require('express');
const cors = require('cors');
const { bookRoute, uploadRoute } = require('./routes');

const app = Express();

const port = 5500;

const allowList = ['http://localhost:3000'];

const corsOptionsDelegate = function (request, callback) {
  let corsOptions;
  if (allowList.indexOf(request.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// 跨域
app.use(cors(corsOptionsDelegate));

app.use(Express.json());

app.use('/api/admin/book', bookRoute);

app.use('/api/admin/upload', uploadRoute);

// 访问上传的静态文件
app.use('/upload', Express.static('public/upload'))

app.listen(port, () => {
  console.log(`服务运行在：http://localhost:${port}`);
});
