(function () {

    //Main module anugular
    var anicApp = angular.module('mainAnicApp',['ui.router', 'core','anic-router']); // angular จะจัดการใน  เพิ่ม <html ng-app="Anic">  // modul เพิ่มเติม[]

    //Main controller ##################################################################################################################
    anicApp.controller('MainController', function ($scope, $http, $q, $compile) {//dependency injection --> $scope $http เข้าไป //$q สำหรับจัดการ Promise HTTP Request ตาม q ไม่ง้ั้น ข้อมูลจะ null



    });
    //End Main controller ##################################################################################################################

    //Spark controller ##################################################################################################################
    anicApp.controller('SparkController', function ($scope, $http, $q, $compile) {//dependency injection --> $scope $http เข้าไป //$q สำหรับจัดการ Promise HTTP Request ตาม q ไม่ง้ั้น ข้อมูลจะ null

      httpGet_data()//get Obj from mongodb
        .then(function(raw_data) {//แกะ object Object.$$state.value //ได้รับ return จาก httpGet_usaVote
            //top
            var data_doughnut = Data_Doughnut(raw_data);//get data to Doughnut
            Chart_Doughnut(data_doughnut);//เรียกให้แสดงผล กราฟโดนัด โดยส่ง data ไปแสดง
            Summary_Chart_Doughnut(data_doughnut.labels,data_doughnut.data_persen);//ให้ไปแสดงสรุปค่า %


            //map usa feq
            var data_usaVote = Data_UsaVote(raw_data);//get data to map usa
            Datamap_Usa(data_usaVote);//แสดง กราฟ usa จากไฟล์ anic.js
            Summary_Datamap_Usa(data_usaVote);

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
                  var data_PosNegArea = Data_PosNegArea(data,'days_ofusa');
                  Chart_PosNegArea(data_PosNegArea,index);

                  //map usa pos_neg
                  var data_PosNegMap = Data_PosNegMap(raw_data[index]);
                  Datamap_PosNeg(data_PosNegMap,index);
                  Summary_Datamap_PosNeg(data_PosNegMap,index);

                  //wordcloud
                  var data_WordCloud = Data_WordCloud(raw_data[index]);
                  Chart_WordCloud(data_WordCloud,index);
                  Summary_Chart_WordCloud(data_WordCloud,index);


                  remove_active(index);
                });

            }
            //var ee = document.getElementsByClassName("keyword0").style.display = "block";


      });///end httpGet_usaVote for Asyco //นอกจากนี้ จะแสดงก่อน ตรงนี้

    /////////////////////////////// function in anugular
    function httpGet_data(){
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
    // End Spark controller ##################################################################################################################


    //ListSteamingController controller //controler สำหรับโชแสดงรายการ steaming ##################################################################################################################
    anicApp.controller('ListSteamingController', function ($scope, $http, $q, $compile) {//dependency injection --> $scope $http เข้าไป //$q สำหรับจัดการ Promise HTTP Request ตาม q ไม่ง้ั้น ข้อมูลจะ null

      httpGet_data()//get Obj from mongodb
        .then(function(data) {//แกะ object Object.$state.value //ได้รับ return จาก httpGet_usaVote

          $scope.list_steaming = data;


        });///end httpGet_usaVote for Asyco //นอกจากนี้ จะแสดงก่อน ตรงนี้

      /////////////////////////////// function in anugular

      function httpGet_data(){
        var deferred = $q.defer();//เริ่มทำงาน มีก่ารทำ q ให้ รอตรงนี้ให้เส็จก่อนค่อยไป
        $http({
             method: 'GET',
             url: '/list_steaming_data'
          }).then(function (success){
            deferred.resolve(success.data);// เสร็จแล้วเอาไปเลย!!
          },function (error){
        });
        return deferred.promise; //รอตามสัญญา ขอเวลาอีกไม่นาน
      }


    });
    //End ListSteamingController controller ##################################################################################################################


    //Steaming controller ##################################################################################################################
    anicApp.controller('SteamingController', function ($scope, $http, $q, $compile, $location, $timeout) {//dependency injection --> $scope $http เข้าไป //$q สำหรับจัดการ Promise HTTP Request ตาม q ไม่ง้ั้น ข้อมูลจะ null// $location สามารถรับค่า param query จาก Url
      httpGet_data()//get Obj from mongodb
        .then(function(raw_data) {//แกะ object Object.$$state.value //ได้รับ return จาก httpGet_usaVote

            var list_data = [];

            Object.keys(raw_data[0].data).forEach(function(key) {//แปลงจาก Hashmap ของ java เป็น list
              list_data.push(raw_data[0].data[key]);
            });

            //top
            var data_doughnut = Data_Doughnut(list_data);//get data to Doughnut
            Chart_Doughnut(data_doughnut);//เรียกให้แสดงผล กราฟโดนัด โดยส่ง data ไปแสดง
            Summary_Chart_Doughnut(data_doughnut.labels,data_doughnut.data_persen);//ให้ไปแสดงสรุปค่า %

            //map usa feq
            var data_usaVote = Data_UsaVote(list_data);//get data to map usa
            Datamap_Usa(data_usaVote);//แสดง กราฟ usa จากไฟล์ anic.js
            Summary_Datamap_Usa(data_usaVote);

            var data_Bar = Data_Bar(list_data);
            Chart_Bar(data_Bar);

            $scope.raw_datas = list_data;//data ที่จะโยนไปใส่ ใน function ที่ html ผ่าน ng-inti
            $scope.creat_graph = function(data,index) {//rool from replect
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
                  var data_PosNegMap = Data_PosNegMap(list_data[index]);
                  Datamap_PosNeg(data_PosNegMap,index);
                  Summary_Datamap_PosNeg(data_PosNegMap,index);

                  //wordcloud
                  var data_WordCloud = Data_WordCloud(list_data[index]);
                  Chart_WordCloud(data_WordCloud,index);
                  Summary_Chart_WordCloud(data_WordCloud,index);

                  /*if(index != 0){
                    $(".tab_"+index).removeClass("active");
                  }*/
                  remove_active(index);
                  //setTimeout(remove_active(index), 1000);
                });
            }
            //setTimeout(update_data, 1000);//ให้ set เวลา ในการ update
            //var ee = document.getElementsByClassName("keyword0").style.display = "block";
            var state = "Steaming";
            if(state == "Steaming"){
              setTimeout(update_data, 60000);//ให้ ครั่งแรก อีก 1 นาที จาก เริ่มไปเรยีก update
            }

      });///end httpGet_usaVote for Asyco //นอกจากนี้ จะแสดงก่อน ตรงนี้

    /////////////////////////////// function in anugular
    $scope.chang_type_time = function(type,index){
      httpGet_data()//get Obj from mongodb
        .then(function(raw_data) {
          var list_data = [];

          Object.keys(raw_data[0].data).forEach(function(key) {//แปลงจาก Hashmap ของ java เป็น list
            list_data.push(raw_data[0].data[key]);
          });

          var data_posNegArea = Data_PosNegArea(list_data[index] , type);
          //console.log(data_posNegArea);
          Update_Chart_PosNegArea(data_posNegArea,index,type);
        });

    }

    //$scope.update_data = function(){
    function update_data(){
      console.log("update");
      httpGet_data()//get Obj from mongodb
        .then(function(raw_data) {
          var list_data = [];

          Object.keys(raw_data[0].data).forEach(function(key) {//แปลงจาก Hashmap ของ java เป็น list
            list_data.push(raw_data[0].data[key]);
          });

          //Doughnut
          var data_doughnut = Data_Doughnut(list_data);//get data to Doughnut
          Update_Chart_Doughnut(data_doughnut);
          Summary_Chart_Doughnut(data_doughnut.labels,data_doughnut.data_persen);//ให้ไปแสดงสรุปค่า %

          //map feg
          var data_usaVote = Data_UsaVote(list_data);//get data to map usa
          Update_Datamap_Usa(data_usaVote);
          Summary_Datamap_Usa(data_usaVote);

          //PosNegArea เปลี่ยนทุกกราฟ ทุก key
          for(var i in list_data){//วนทำในแต่ละ keyword

            //map neg positive
            var data_PosNegMap = Data_PosNegMap(list_data[i]);
            Update_Datamap_PosNeg(data_PosNegMap,i);
            Summary_Datamap_PosNeg(data_PosNegMap,i);


            var data_posNegArea = Data_PosNegArea(list_data[i] , 'null');
            Update_Chart_PosNegArea(data_posNegArea,i);

            //wordcloud
            var data_WordCloud = Data_WordCloud(list_data[i]);
            Update_Chart_WordCloud(data_WordCloud,i);
          }
          ////
          setTimeout(update_data, 60000);//เรียกใช้ function ตัวเองให้ update
        });
    }

    function httpGet_data(){
      var topic_param = $location.search().topic; //รับ param query จาก url เพิ่อ ระบุ topic

      var deferred = $q.defer();//เริ่มทำงาน มีก่ารทำ q ให้ รอตรงนี้ให้เส็จก่อนค่อยไป
      $http({
           method: 'GET',
           url: '/steaming_data?topic='+topic_param
        }).then(function (success){
          deferred.resolve(success.data);// เสร็จแล้วเอาไปเลย!!
        },function (error){
      });
      return deferred.promise; //รอตามสัญญา ขอเวลาอีกไม่นาน
    }

    function httpGet_data_bytopic(topic){
      var deferred = $q.defer();//เริ่มทำงาน มีก่ารทำ q ให้ รอตรงนี้ให้เส็จก่อนค่อยไป
      $http({
           method: 'GET',
           url: '/steaming_data?topic='+topic
        }).then(function (success){
          deferred.resolve(success.data);// เสร็จแล้วเอาไปเลย!!
        },function (error){
      });
      return deferred.promise; //รอตามสัญญา ขอเวลาอีกไม่นาน
    }

    });
    // EndSteaming controller ##################################################################################################################

})();
// end Main module anugular

//function รวม นอก angular
function remove_active(index){//ลบ active class ของ tap
  if(index != 0){
    console.log(index);
    $(".tab_"+index).removeClass("active");
  }
}
