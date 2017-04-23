var compression = require('compression');//เรียกใช้ เพื่อให้สามารถบีบอัด res ได้
var express = require('express'); //เรียกใช้ express
//var morgan = require('morgan');//เรียกใช้ mogan ไว้สำหรับให้ทำ debug log ได้
var bodyParser = require('body-parser');//ใช้ สามารถใช้ midlle ware ได้

module.exports = function(){// export module เพื่อให้ตัวอื่นเรียกใช้ตัวมันได้
  var app = express();

  app.use(compression());//ให้ใช้ compression

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));//ให้ใช้ midlle ware แบบ url string

  // parse application/json
  app.use(bodyParser.json());//แล้วก็ให้เรียกใช้งาน แบบ post json ใช้ได้
  //app.use(bodyParser.json({ type: 'application/*+json' }));

  app.set('views','./app/views'); //set ให้ไปเรียกดัง html ที่นี้
  app.set('view engine', 'ejs');//template ที่ใช้ gen html --> jade

  app.use(express.static('./public'));//ให้  fix  css js img ไว้ล่าง route จะเร็ว

  //สร้าง routes แต่ละ part
  require('../app/routes/index.server.routes.js')(app);//เมื่อเข้า server js แล้วจะมา express เมื่อใส่ part ให้ไป rounting ที่ index.routers js

  require('../app/routes/usaVote.server.routes.js')(app);//Page usaVote
  require('../app/routes/usaVote_data.server.routes.js')(app);//data json

  require('../app/routes/steaming.server.routes.js')(app);//page Steaming
  require('../app/routes/steaming_data.server.routes.js')(app);//data json

  require('../app/routes/list_steaming_data.server.routes.js')(app);//data json


  return app;
};
