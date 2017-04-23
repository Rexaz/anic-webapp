module.exports = function (app) {//เมื้อมีคำเรียก จะมีการส่ง app,k
  var list_steamnig_data = require('../controllers/list_steaming_data.server.controller.js');// เป้น index ของ controller.js
  //app.get('/anic',index.render);
  app.route('/list_steaming_data')
  .post(list_steamnig_data.create)//โดยเรียกฟังชั่น create
  .get(list_steamnig_data.list);//read
};
