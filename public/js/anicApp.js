(function () {

    //Main anugular
    var anicApp = angular.module('Anic',[]); // angular จะจัดการใน  เพิ่ม <html ng-app="Anic">  // modul เพิ่มเติม[]

    //Main controller **************************************************************************************************************
    anicApp.controller('MainController', function ($scope, $http, $q) {//dependency injection --> $scope $http เข้าไป //$q สำหรับจัดการ Promise HTTP Request ตาม q ไม่ง้ั้น ข้อมูลจะ null

      httpGet_usaVote()//get Obj from mongodb
        .then(function(raw_data) {//แกะ object Object.$$state.value //ได้รับ return จาก httpGet_usaVote

            var data_usaVote = Data_UsaVote(raw_data);//get data to map usa
            Datamap_Usa(data_usaVote);//แสดง กราฟ usa จากไฟล์ anic.js

            var data_doughnut = Data_Doughnut(raw_data);//get data to Doughnut
            Chart_Doughnut(data_doughnut);//เรียกให้แสดงผล กราฟโดนัด โดยส่ง data ไปแสดง

            var data_Bar = Data_Bar(raw_data);
            Chart_Bar(data_Bar);

            var data_PosNegArea = Data_PosNegArea(raw_data);
            Chart_PosNegArea(data_PosNegArea);

            var data_WordCloud = Data_WordCloud(raw_data);
            Chart_WordCloud(data_WordCloud);


      });///end httpGet_usaVote for Asyco //นอกจากนี้ จะแสดงก่อน ตรงนี้
      $scope.anic = "Hello AngularJS"; //$scope เป็นตัวเชื่อระหว่าง Contorller กับ View ให้เห็นกัน




/////////////////////////////// function in anugular
    function httpGet_usaVote(){
      var deferred = $q.defer();//เริ่มทำงาน มีก่ารทำ q ให้ รอตรงนี้ให้เส็จก่อนค่อยไป
      $http({
           method: 'GET',
           url: '/usavote_get'
        }).then(function (success){
          deferred.resolve(success.data);// เสร็จแล้วเอาไปเลย!!
        },function (error){
      });
      return deferred.promise; //รอตามสัญญา ขอเวลาอีกไม่นาน
    }

});
///////////////////////////////////////// end angular

})();
