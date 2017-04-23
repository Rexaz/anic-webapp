var mongoose = require('mongoose');//เรียก mongoose
var Schema = mongoose.Schema; //กำหนดตัวแปล Schema


//ตัวแปร js object โดย เราจำำหนด ฟิลอะไรบ้าง
var Anic = new Schema({
  name : String,
  level : String

});

mongoose.model('Anic',Anic);//ตั้งชื่อ model
