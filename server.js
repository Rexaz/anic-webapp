var express = require('./config/express.js');// ไปเรียด express ใน config
var app = express();
app.listen(3000); // ตั้งใช้ ไปใช้ port ไหน
module.exports = app; // ให้คนอื่นเรียกไปใช้ได้

console.log('Server running at localhost:3000');
