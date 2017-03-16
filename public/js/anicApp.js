(function () {

    //Main anugular
    var anicApp = angular.module('Anic',[]); // angular จะจัดการใน  เพิ่ม <html ng-app="Anic">  // modul เพิ่มเติม[]

    //Main controller **************************************************************************************************************
    anicApp.controller('MainController', function ($scope, $http) {//dependency injection --> $scope $http เข้าไป
      $scope.anic = "Hello AngularJS"; //$scope เป็นตัวเชื่อระหว่าง Contorller กับ View ให้เห็นกัน


      httpGet_usaVote();//get Obj from mongodb















/////////////////////////////// function in anugular
      function httpGet_usaVote(){
        var usa = {};
        $http({
             method: 'GET',
             url: '/usavote_get'
          }).then(function (success){
            var datas = success.data
            //for(var a in $scope.data_usa){
            var sum = 0;
            Object.keys(datas[0].location).forEach(function(key) {
              if(key!="" && key !="usa"){
                sum +=  datas[0].location[key].pos + datas[0].location[key].neg;
              }
            });


            Object.keys(datas[0].location).forEach(function(key) {//loop get key
              var detail ={};
              var vote =  datas[0].location[key].pos + datas[0].location[key].neg;//รวม vote ทั้งหมด จาก pos neg

              var rat = Number((vote/sum)*50).toFixed(2);//2 digit

              //console.log(key+" "+rat);

              if(rat<=0.20){
                detail['fillKey'] = "color0";
              }
              else if (rat >= 0.21 && rat <= 0.40) {
                detail['fillKey'] = "color1";
              }
              else if (rat >= 0.41 && rat <= 0.60) {
                detail['fillKey'] = "color2";
              }
              else if (rat >= 0.61 && rat <= 0.80) {
                detail['fillKey'] = "color3";
              }
              else if (rat >= 0.81) {
                detail['fillKey'] = "color4";
              }

              detail['electoralVotes'] = vote;
              usa[key] = detail;//เอา state แต่ละอันไปใส่ json อันใหม่เพื่อเรืยง
              //console.log(key+" "+detail['fillKey']);

              });

              Datamap_Usa(usa);//แสดง กราฟ usa จากไฟล์ anic.js

          },function (error){

        });
      }
});
///////////////////////////////////////// end angular
})();
