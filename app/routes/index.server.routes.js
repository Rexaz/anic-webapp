module.exports = function (app) {//เมื้อมีคำเรียก จะมีการส่ง app,k
  var index = require('../controllers/index.server.controller.js');// เป้น index ของ controller.js
  app.get('/',index.render);
};
