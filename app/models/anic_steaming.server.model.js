var mongoose = require('mongoose');//เรียก mongoose
var Schema = mongoose.Schema; //กำหนดตัวแปล Schema


//ตัวแปร js object โดย เราจำำหนด ฟิลอะไรบ้าง
var steaming = new Schema({
  name : String,
  level : String

});

mongoose.model('anic_steaming',steaming);//ตั้งชื่อ model
