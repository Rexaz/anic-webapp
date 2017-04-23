module.exports = function (app) {//เมื้อมีคำเรียก จะมีการส่ง app,k
  var Steaming = require('../controllers/Steaming.server.controller.js');// เป้น index ของ controller.js
  app.get('/Steaming',Steaming.render);
};
