angular.module('anic-router').config([//ให้ทำงานตอนเริ่มต้น ตอนลงทะเยีนร provider
  '$stateProvider',//รับ พารามิตเตอร์ ตัวจำการ state
  function($stateProvider){
    $stateProvider
    .state('home',{//เป็นกท่ลารสร้าง state และระบุชื่อ state
      url: '/', //ชื่อ state นี้ อยุ่ที่ url ไหน
      templateUrl : '/modules/view/home.ejs'//ระบุ tempate ที่จะไปอ่าน //// จะไปแทน <div ui-view></div>
    })
    .state('list_steaming',{
      url: '/list_steaming', //ชื่อ state นี้ อยุ่ที่ url ไหน
      templateUrl : '/modules/view/list_steaming.ejs'
    })
    .state('steaming',{
      url: '/steaming', //ชื่อ state นี้ อยุ่ที่ url ไหน
      templateUrl : '/modules/view/steaming.ejs'
    })
    .state('usavote',{
      url: '/usavote', //ชื่อ state นี้ อยุ่ที่ url ไหน
      templateUrl : '/modules/view/usavote.ejs'
    });


  }
]);
