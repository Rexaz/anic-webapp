//สร้าง router
angular.module('core').config([//มีการ Inject
  '$locationProvider',
  '$urlRouterProvider',
  function($locationProvider, $urlRouterProvider){
    $locationProvider.hashPrefix('!');//ทำให้ Seach engin รุ้ว่า มีการใช้ ui-router ของ angular จะได้หา url สำหรับทำ seo ได้
    $urlRouterProvider.otherwise('/');//ถ้า เกิด มี part ที่ ไม่รู้จัก ใน state ก็ จะให้ forword ไป /
  }
]);
