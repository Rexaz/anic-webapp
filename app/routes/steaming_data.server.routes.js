module.exports = function (app) {//เมื้อมีคำเรียก จะมีการส่ง app,k
  var steamnig_data = require('../controllers/steaming_data.server.controller.js');// เป้น index ของ controller.js
  //app.get('/anic',index.render);
  app.route('/steaming_data')
  .post(steamnig_data.create)//โดยเรียกฟังชั่น create
  .get(steamnig_data.list);//read
};
