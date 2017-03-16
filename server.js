var express = require('./config/express.js');// ไปเรียด express ใน config
var mongoose = require('./config/mongoose.js');//เรียก เพื่อเชื่อมต่อ

var db = mongoose(); //รับ db ที่ connect แล้ว //เอา mongoose ขึ้นก่อนให้ load model,connect เส็จก่อน
var app = express();

app.listen(80); // ตั้งใช้ ไปใช้ port ไหน
module.exports = app; // ให้คนอื่นเรียกไปใช้ได้

console.log('Server running at localhost:80');
