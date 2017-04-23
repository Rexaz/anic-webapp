(function () {

    //Main anugular
    var anicApp = angular.module('mainAnicApp',[]); // angular จะจัดการใน  เพิ่ม <html ng-app="Anic">  // modul เพิ่มเติม[]

    //Main controller **************************************************************************************************************
    anicApp.controller('MainController', function ($scope, $http, $q, $compile) {//dependency injection --> $scope $http เข้าไป //$q สำหรับจัดการ Promise HTTP Request ตาม q ไม่ง้ั้น ข้อมูลจะ null

          httpGet_usaVote()//get Obj from mongodb
            .then(function(raw_data) {//แกะ object Object.$$state.value //ได้รับ return จาก httpGet_usaVote
                //top
                var data_doughnut = Data_Doughnut(raw_data);//get data to Doughnut
                Chart_Doughnut(data_doughnut);//เรียกให้แสดงผล กราฟโดนัด โดยส่ง data ไปแสดง

                //map usa feq
                var data_usaVote = Data_UsaVote(raw_data);//get data to map usa
                Datamap_Usa(data_usaVote);//แสดง กราฟ usa จากไฟล์ anic.js

                var data_Bar = Data_Bar(raw_data);
                Chart_Bar(data_Bar);

                $scope.raw_datas = raw_data;//data ที่จะโยนไปใส่ ใน function ที่ html ผ่าน ng-inti

                $scope.creat_graph = function(data,index) {//rool from replect
                  console.log(raw_data);

                    //append element with angular
                    //angular.element(".replace_graph").append("<div class='node"+i+" card-2'></div>");//กด div crade each keyword
                    //var ngclick_button = "<button type='button' name='button' ng-click=\"hide_show(\'keyword"+i+"\')\" class='lable_close'>test</button>";//append element with ng-click ใช้แบบปกติไม่ได้
                    //angular.element(".node"+index).append( $compile(ngclick_button)($scope) );
                    //angular.element(".node"+index).append("<h1> "+ raw_data[index].keyword +" </h1>");
                    //angular.element(".node"+index).append("<div class='keyword"+index+" hide_show' ></div>");

                    angular.element(document).ready(function() {//ใส่เพื่อ ให้ ่js รอ html พร้อม gen เส็จเเล้วทำ ไม่งั้น จะ getElementById ไม่เจอ

                    //PosNegArea กราฟเทียบ pos neg ตามช่วงแต่ละวัน ของ keyword
                    var data_PosNegArea = Data_PosNegArea(data,'days');
                    Chart_PosNegArea(data_PosNegArea,index);

                    //map usa pos_neg
                    var data_PosNegMap = Data_PosNegMap(raw_data[index]);
                    Datamap_PosNeg(data_PosNegMap,index);

                    //wordcloud
                    var data_WordCloud = Data_WordCloud(raw_data[index]);
                    Chart_WordCloud(data_WordCloud,index);

                    });



                }
                //var ee = document.getElementsByClassName("keyword0").style.display = "block";


          });///end httpGet_usaVote for Asyco //นอกจากนี้ จะแสดงก่อน ตรงนี้
          $scope.anic = "Hello AngularJS"; //$scope เป็นตัวเชื่อระหว่าง Contorller กับ View ให้เห็นกัน


        /////////////////////////////// function in anugular
        $scope.hide_show = function(index){//hide and show div for graph by keyword
          $('.'+index).toggle();
        };


        function httpGet_usaVote(){
          var deferred = $q.defer();//เริ่มทำงาน มีก่ารทำ q ให้ รอตรงนี้ให้เส็จก่อนค่อยไป
          $http({
               method: 'GET',
               url: '/usaVote_data'
            }).then(function (success){
              deferred.resolve(success.data);// เสร็จแล้วเอาไปเลย!!
            },function (error){
          });
          return deferred.promise; //รอตามสัญญา ขอเวลาอีกไม่นาน
        }




    });
///////////////////////////////////////// end angular Main





  //Spark controller **************************************************************************************************************
  anicApp.controller('SparkController', function ($scope, $http, $q, $compile) {//dependency injection --> $scope $http เข้าไป //$q สำหรับจัดการ Promise HTTP Request ตาม q ไม่ง้ั้น ข้อมูลจะ null

    httpGet_usaVote()//get Obj from mongodb
      .then(function(raw_data) {//แกะ object Object.$$state.value //ได้รับ return จาก httpGet_usaVote

          //top
          var data_doughnut = Data_Doughnut(raw_data);//get data to Doughnut
          Chart_Doughnut(data_doughnut);//เรียกให้แสดงผล กราฟโดนัด โดยส่ง data ไปแสดง

          //map usa feq
          var data_usaVote = Data_UsaVote(raw_data);//get data to map usa
          Datamap_Usa(data_usaVote);//แสดง กราฟ usa จากไฟล์ anic.js

          var data_Bar = Data_Bar(raw_data);
          Chart_Bar(data_Bar);

          $scope.raw_datas = raw_data;//data ที่จะโยนไปใส่ ใน function ที่ html ผ่าน ng-inti

          $scope.creat_graph = function(data,index) {//rool from replect
              //append element with angular
              //angular.element(".replace_graph").append("<div class='node"+i+" card-2'></div>");//กด div crade each keyword
              //var ngclick_button = "<button type='button' name='button' ng-click=\"hide_show(\'keyword"+i+"\')\" class='lable_close'>test</button>";//append element with ng-click ใช้แบบปกติไม่ได้
              //angular.element(".node"+index).append( $compile(ngclick_button)($scope) );
              //angular.element(".node"+index).append("<h1> "+ raw_data[index].keyword +" </h1>");
              //angular.element(".node"+index).append("<div class='keyword"+index+" hide_show' ></div>");

              angular.element(document).ready(function() {//ใส่เพื่อ ให้ ่js รอ html พร้อม gen เส็จเเล้วทำ ไม่งั้น จะ getElementById ไม่เจอ

              //PosNegArea กราฟเทียบ pos neg ตามช่วงแต่ละวัน ของ keyword
              var data_PosNegArea = Data_PosNegArea(data,'days');
              Chart_PosNegArea(data_PosNegArea,index);

              //map usa pos_neg
              var data_PosNegMap = Data_PosNegMap(raw_data[index]);
              Datamap_PosNeg(data_PosNegMap,index);

              //wordcloud
              var data_WordCloud = Data_WordCloud(raw_data[index]);
              Chart_WordCloud(data_WordCloud,index);

              });



          }
          //var ee = document.getElementsByClassName("keyword0").style.display = "block";


    });///end httpGet_usaVote for Asyco //นอกจากนี้ จะแสดงก่อน ตรงนี้
    $scope.anic = "Hello AngularJS"; //$scope เป็นตัวเชื่อระหว่าง Contorller กับ View ให้เห็นกัน


  /////////////////////////////// function in anugular
  $scope.hide_show = function(index){//hide and show div for graph by keyword
    $('.'+index).toggle();
  };


  function httpGet_usaVote(){
    var deferred = $q.defer();//เริ่มทำงาน มีก่ารทำ q ให้ รอตรงนี้ให้เส็จก่อนค่อยไป
    $http({
         method: 'GET',
         url: '/usaVote_data'
      }).then(function (success){
        deferred.resolve(success.data);// เสร็จแล้วเอาไปเลย!!
      },function (error){
    });
    return deferred.promise; //รอตามสัญญา ขอเวลาอีกไม่นาน
  }

  });
  ///////////////////////////////////////// end angular Steaming





  //Steaming controller **************************************************************************************************************
  anicApp.controller('SteamingController', function ($scope, $http, $q, $compile) {//dependency injection --> $scope $http เข้าไป //$q สำหรับจัดการ Promise HTTP Request ตาม q ไม่ง้ั้น ข้อมูลจะ null


    httpGet_usaVote()//get Obj from mongodb
      .then(function(raw_data) {//แกะ object Object.$$state.value //ได้รับ return จาก httpGet_usaVote

          //top
          var data_doughnut = Data_Doughnut(raw_data);//get data to Doughnut
          Chart_Doughnut(data_doughnut);//เรียกให้แสดงผล กราฟโดนัด โดยส่ง data ไปแสดง

          //map usa feq
          var data_usaVote = Data_UsaVote(raw_data);//get data to map usa
          Datamap_Usa(data_usaVote);//แสดง กราฟ usa จากไฟล์ anic.js

          var data_Bar = Data_Bar(raw_data);
          Chart_Bar(data_Bar);

          $scope.raw_datas = raw_data;//data ที่จะโยนไปใส่ ใน function ที่ html ผ่าน ng-inti

          $scope.creat_graph = function(data,index) {//rool from replect html
              //append element with angular
              //angular.element(".replace_graph").append("<div class='node"+i+" card-2'></div>");//กด div crade each keyword
              //var ngclick_button = "<button type='button' name='button' ng-click=\"hide_show(\'keyword"+i+"\')\" class='lable_close'>test</button>";//append element with ng-click ใช้แบบปกติไม่ได้
              //angular.element(".node"+index).append( $compile(ngclick_button)($scope) );
              //angular.element(".node"+index).append("<h1> "+ raw_data[index].keyword +" </h1>");
              //angular.element(".node"+index).append("<div class='keyword"+index+" hide_show' ></div>");

              angular.element(document).ready(function() {//ใส่เพื่อ ให้ ่js รอ html พร้อม gen เส็จเเล้วทำ ไม่งั้น จะ getElementById ไม่เจอ

                //PosNegArea กราฟเทียบ pos neg ตามช่วงแต่ละวัน ของ keyword
                var data_PosNegArea = Data_PosNegArea(data,'mins');
                Chart_PosNegArea(data_PosNegArea,index);

                //map usa pos_neg
                var data_PosNegMap = Data_PosNegMap(raw_data[index]);
                Datamap_PosNeg(data_PosNegMap,index);

                //wordcloud
                var data_WordCloud = Data_WordCloud(raw_data[index]);
                Chart_WordCloud(data_WordCloud,index);

              });



          }
          //var ee = document.getElementsByClassName("keyword0").style.display = "block";


    });///end httpGet_usaVote for Asyco //นอกจากนี้ จะแสดงก่อน ตรงนี้
    $scope.anic = "Hello AngularJS"; //$scope เป็นตัวเชื่อระหว่าง Contorller กับ View ให้เห็นกัน


  /////////////////////////////// function in anugular
  $scope.hide_show = function(index){//hide and show div for graph by keyword
    $('.'+index).toggle();
  };


  function httpGet_usaVote(){
    var deferred = $q.defer();//เริ่มทำงาน มีก่ารทำ q ให้ รอตรงนี้ให้เส็จก่อนค่อยไป
    $http({
         method: 'GET',
         url: '/steaming_data'
      }).then(function (success){
        deferred.resolve(success.data);// เสร็จแล้วเอาไปเลย!!
      },function (error){
    });
    return deferred.promise; //รอตามสัญญา ขอเวลาอีกไม่นาน
  }

  });
  ///////////////////////////////////////// end angular Steaming


//////////////////////////////////////////
})();
