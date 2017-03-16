var Anic = require('mongoose').model('Anic');//ไปเรียกโมเดลมา ที่เคยสร้าง
var Usa = require('mongoose').model('Usa');//ไปเรียกโมเดลมา ที่เคยสร้าง


exports.create = function(req,res,next){//function create
    console.log(JSON.stringify(req.body));
    var anic = new Anic(req.body); //เริม่สร้าง objcet

    anic.save(function(err){//จะทำการ save ลง mongo
        if (err){
          return next(err);//ถ้ามี error ก็จะส่งต่อไปทำ
        }
        else {//save ได้
          res.json(anic);//ส่งไป Mongo เป้น json //oject เปล่าๆ
        }
    });
};


exports.list = function(req,res,next){//read list form mongoose
  Usa.find({},function(err,anics){//find = select
      if(err){
        return next(err);
      }
      else {
        res.json(anics);
      }
  });
};
