//mongoose connect
var mongoose = require('mongoose');
var uri = "mongodb://localhost/ANIC";
var db = mongoose.connect(uri,function(err, db) {
  if(!err) {
    console.log("connected mongodb");
  }
  else{
    console.log("can't connect mongodb");
  }
});

module.exports = function(){
  //mongoose.set('debug',config.debug);//set ใช้ show log เมื่อมีปัญหาตอน Insert update delect
  var db = mongoose.createConnection(uri);

  require('../app/models/anic.server.model.js')//ทำให้รู้จัก model
  require('../app/models/usa.server.model.js')//ทำให้รู้จัก model
  require('../app/models/anic_steaming.server.model.js')//ทำให้รู้จัก model

  return db;
};
