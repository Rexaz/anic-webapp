module.exports = function (app) {//เมื้อมีคำเรียก จะมีการส่ง app,k
  var usaVote = require('../controllers/usaVote_data.server.controller.js');// เป้น index ของ controller.js
  //app.get('/anic',index.render);

  app.route('/usaVote_data')
  .post(usaVote.create)//โดยเรียกฟังชั่น create
  .get(usaVote.list);//read
};
