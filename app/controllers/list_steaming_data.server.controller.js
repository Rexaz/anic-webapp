var Steaming = require('mongoose').model('anic_steaming');//ไปเรียกโมเดลมา ที่เคยสร้าง

exports.create = function(req,res,next){//function create
    console.log(JSON.stringify(req.body));
    var steaming = new Steaming(req.body); //เริม่สร้าง objcet

    steaming.save(function(err){//จะทำการ save ลง mongo
        if (err){
          return next(err);//ถ้ามี error ก็จะส่งต่อไปทำ
        }
        else {//save ได้
          res.json(steaming);//ส่งไป Mongo เป้น json //oject เปล่าๆ
        }
    });
};

///ไป อ่าน ที่ collectoin ของ mongo -- > Steamings
//ตัวชื่อ model + s จะไปเรียก collection นั้น
exports.list = function(req,res,next){//read list form mongoose
  Steaming.find({},function(err,data){//find 
      if(err){
        return next(err);
      }
      else {
        res.json(data);
      }
  });
};
