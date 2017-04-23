exports.render = function (req,res) {//render รับ res กับ res
  //res.send('helloWord');//เมื้อได้รับ req ก็ส่ง helloWord ออกไป
  res.render('Steaming',{//ให้ไปอ่านไฟล์ index.jade
    title: 'Usa map',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
    names: ['John Doe', 'Jane Doe', 'Jane Dane']
  });
};
