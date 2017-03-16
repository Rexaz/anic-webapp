var mongoose = require('mongoose');//เรียก mongoose
var Schema = mongoose.Schema; //กำหนดตัวแปล Schema


//ตัวแปร js object โดย เราจำำหนด ฟิลอะไรบ้าง
var Usa = new Schema({
  name :{
    us : String,
    level : Number
  }
});

mongoose.model('Usa',Usa);//ตั้งชื่อ model
