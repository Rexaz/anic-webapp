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


          //detail
          console.log(raw_data);
          $scope.topic = "สำรวจการเลือกตั้ง ประธานาธิบดีสหรัฐอเมริกา";
          $scope.start_process = date_thai("11/01/2017");
          $scope.last_update = date_thai("13/02/2017");
          $scope.status =  check_status_steaming("13/02/2017");



            //top
            var data_doughnut = Data_Doughnut(raw_data);//get data to Doughnut
            Chart_Doughnut(data_doughnut);//เรียกให้แสดงผล กราฟโดนัด โดยส่ง data ไปแสดง
            Summary_Chart_Doughnut(data_doughnut.labels,data_doughnut.data_persen);//ให้ไปแสดงสรุปค่า %


            //map usa feq
            var data_usaVote = Data_UsaVote(raw_data);//get data to map usa
            Datamap_Usa(data_usaVote);//แสดง กราฟ usa จากไฟล์ anic.js
            Summary_Datamap_Usa(data_usaVote);

            //var data_Bar = Data_Bar(raw_data);
            //Chart_Bar(data_Bar);

            //Gauge
            var data_Gauge = Data_Gauge(raw_data);
            Chart_Gauge(data_Gauge);
            Summary_Chart_Gauge(data_Gauge);

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

          for(var d in data){
            data[d]['status'] = check_status_steaming(data[d].last_update);
          }
          $scope.list_steaming = data;



        });///end httpGet_usaVote for Asyco //นอกจากนี้ จะแสดงก่อน ตรงนี้

        $scope.dateThai = function(datetime) {
          return date_thai(datetime);
        }

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


            //detail
            $scope.topic = raw_data[0].topic;
            $scope.start_process = date_thai(raw_data[0].start_process);
            $scope.last_update = date_thai(raw_data[0].last_update);
            $scope.status = check_status_steaming(raw_data[0].last_update);






            date_thai(raw_data[0].last_update);

            //top
            var data_doughnut = Data_Doughnut(list_data);//get data to Doughnut
            Chart_Doughnut(data_doughnut);//เรียกให้แสดงผล กราฟโดนัด โดยส่ง data ไปแสดง
            Summary_Chart_Doughnut(data_doughnut.labels,data_doughnut.data_persen);//ให้ไปแสดงสรุปค่า %

            //map usa feq
            var data_usaVote = Data_UsaVote(list_data);//get data to map usa
            Datamap_Usa(data_usaVote);//แสดง กราฟ usa จากไฟล์ anic.js
            Summary_Datamap_Usa(data_usaVote);

            //var data_Bar = Data_Bar(list_data);
            //Chart_Bar(data_Bar);

            //Gauge
            var data_Gauge = Data_Gauge(list_data);
            Chart_Gauge(data_Gauge);
            Summary_Chart_Gauge(data_Gauge);


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
                  remove_active(index);//ลบ class ative ให้กราฟ D3 map ไม่บัค
                  //setTimeout(remove_active(index), 1000);
                });
            }
            //setTimeout(update_data, 1000);//ให้ set เวลา ในการ update
            //var ee = document.getElementsByClassName("keyword0").style.display = "block";

            if(check_status_steaming(raw_data[0].last_update) == "กำลังสำรวจ"){//check status
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

          $scope.topic = raw_data[0].topic;
          $scope.start_process = date_thai(raw_data[0].start_process);
          $scope.last_update = date_thai(raw_data[0].last_update);
          $scope.status = check_status_steaming(raw_data[0].last_update);

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

          //Gauge
          var data_Gauge = Data_Gauge(list_data);
          Update_Chart_Gauge(data_Gauge);
          Summary_Chart_Gauge(data_Gauge);

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

          if(check_status_steaming(raw_data[0].last_update) == "กำลังสำรวจ"){//check status
            setTimeout(update_data, 60000);//เรียกใช้ function ตัวเองให้ update
          }
          else {
            console.log("Finish");
          }
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
    $(".tab_"+index).removeClass("active");
  }
}
function check_status_steaming(datatime){

  var date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });//ใช้ time zone นี้เพราะ java get date ออกมา GTM+0
  var now_date = moment(date).format('DD/MM/YYYY HH:mm');

  var check_time =  moment.utc(moment(now_date,"DD/MM/YYYY HH:mm").diff(moment(datatime,"DD/MM/YYYY HH:mm"))).format("DD/MM/YYYY HH:mm");//หาค่าระหว่าง วันเวลาให้
  if(check_time < "01/01/1970 00:01"){//เช็ค เวลาไม่เกิน 2 นาที
    return "กำลังสำรวจ";
  }
  else {
    return "สิ้นสุดการสำรวจ";
  }

}

function date_thai(datetime) {

  var months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  var date = "1/1/1";
  var time = "";
  try {date = datetime.split(" ")[0];} catch (err) {console.log(err);}

  try {time = datetime.split(" ")[1];} catch (err) {}
  if(!time){
    time = ""
  }
  var arr_date = date.split("/");
  var month = months[parseInt(arr_date[1])-1];
  return  arr_date[0]+"/"+month+"/"+arr_date[2]+ " "+time;

}
