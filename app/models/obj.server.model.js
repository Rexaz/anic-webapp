var mongoose = require('mongoose');//เรียก mongoose
var Schema = mongoose.Schema; //กำหนดตัวแปล Schema


//ตัวแปร js object โดย เราจำำหนด ฟิลอะไรบ้าง
var Summarize = new Schema({
  _id : String,
  keyword : String,
  sentiment : {
    pos : Number,
    neg : Number
  },
  wordcloud : [{
    valuse : Schema.Types.Mixed
  }],
  location : [{
    valuse : Schema.Types.Mixed
  }],
  datetime : [{
    valuse : Schema.Types.Mixed
  }],




});

mongoose.model('Obj',Anic);//ตั้งชื่อ model
