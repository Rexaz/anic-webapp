module.exports = function (app) {//เมื้อมีคำเรียก จะมีการส่ง app,k
  var usavote = require('../controllers/usaVote.server.controller.js');// เป้น index ของ controller.js
  app.get('/usavote',usavote.render);
};
