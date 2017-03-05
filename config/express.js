var express = require('express'); //เรียกใช้ express
module.exports = function(){// export module เพื่อให้ตัวอื่นเรียกใช้ตัวมันได้
  var app = express();
  require('../app/routes/index.routes.js')(app);
  return app;
};
