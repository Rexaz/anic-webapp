var color =[
  'rgb(255, 99, 132)',//red
  'rgb(255, 159, 64)',//orange
  'rgb(255, 205, 86)',//yellow
  'rgb(75, 192, 192)',//green
  'rgb(54, 162, 235)',//blue
  'rgb(153, 102, 255)',//purple
  'rgb(231,233,237)'//grey
];

var region = ['AK','WA','OR','CA','NV','HI','UT','AZ','ID','MT','WY','CO','NM',//West
  'ND','SD','NE','KS','MN','IA','MO','WI','IL','IN','MI','OH',//MiD-west
  'TK','OK','AR','LA','MS','AL','TN','KY','WV','VA','NC','SC','GA','FL','DE','MD',//South
  'PA','NY','NJ','CT','VT','NH','ME','MA','RI']//North-east

////////////////////////////
////////////////////////////Data_UsaVote
function Data_UsaVote(_datas) {//หารูปแบบ data ให้ Datamap_Usa
  var Alldata = {};//data ข้อมูลแต่ละระรัฐพร้อม ส่งให้ Datamap_Usa เพื่อแสดง map
  var datas = _datas;

  //var location = datas[0].location;
  var location; //= datas[0].location;
  for(var l in datas){//ทำให้ data location ที่ไม่มีใน mongo มีค่าเริ่มต้น
    location = datas[l].location;
    for(var r in region){
      try{//ค่าที่มามาตั้งแต่ mongo
        location[region[r]]['total'] = 0;
      }
      catch(err){//ใส่ให้เองตาม key เพิ่มใหม่เพราะ ไม่มี key นี้ใน Mongo
        location[region[r]] = {'total' : 0};
        location[region[r]] = {'pos' : 0,'neg' : 0};
      }
    }
  }

  /*for(var r in region){
    try{//ค่าที่มามาตั้งแต่ mongo
      location[region[r]]['total'] = 0;
    }
    catch(err){//ใส่ให้เองตาม key เพิ่มใหม่เพราะ ไม่มี key นี้ใน Mongo
      location[region[r]] = {'total' : 0};
      location[region[r]] = {'pos' : 0,'neg' : 0};
    }
  }*/

  var data = {};
  var fillColor ={};

  var sum = 0;
  var arr_vote = [];

  var total_nokey =0;//รวมการ vote ที่ไม่มี kwyword
  Object.keys(location).forEach(function(key) {
    if(key!="" && key !="USA" && key != null && key != 'null'){
      var total = 0;

      for(var i in datas){//แต่ละ keyword
        var pos =0;
        try{pos = datas[i].location[key].pos;}
        catch(err){pos =0;}

        var neg =0;
        try{neg = datas[i].location[key].neg;}
        catch(err){neg =0;}

        /*if(pos == null){pos=0;}
        if(neg == null){neg =0;}*/

        total +=pos+neg;//รวม pos neg ของทุก keyword
      }
      location[key]['total'] = total;//ฝาก total ไว้ที่ ช่อง 0 เป็นค่าที่ รวม การ vote จากทุก key ของแต่ละรัฐ
      arr_vote.push(total);//เอา total ไป รวมกัน
    }
    else{
      for(var i in datas){//แต่ละ keyword
        var pos =0;
        try{pos = datas[i].location[key].pos;}
        catch(err){pos =0;}

        var neg =0;
        try{neg = datas[i].location[key].neg;}
        catch(err){neg =0;}

        /*if(pos == null){pos=0;}
        if(neg == null){neg =0;}*/

        total_nokey +=pos+neg;//รวม pos neg ของ ที่ไม่มีkeyword
      }
    }
  });
  console.log(total_nokey);//ฝาก total ไว้ที่ ช่อง 0 เป็นค่าที่ รวม การ vote จากทุก key ของแต่ละรัฐ

  var max_vote = Math.max.apply(null, arr_vote);//เอา vote อันที่มากสุดตั้งใน การหาสี เข้มสุด

  Object.keys(location).forEach(function(key) {//loop get key
    var detail ={};
    var vote =  location[key].total;//รวม vote ทั้งหมด จาก pos neg

    var scal_g = 255-(Math.abs(120-(Math.ceil((vote/max_vote)*135)+120)));//เริ่มที่เข้มสุดที่ 120 อ่อนสุด 255
    var scal_rb = 255-(Math.ceil((vote/max_vote)*255));//เริ่มเข้มสุด 0 อ่อนสุด 255
    var scel_color = 'rgb('+scal_rb+' ,'+scal_g+','+scal_rb+')'; //หา scel ระดับสีของแต่ระรัฐ
    fillColor[key] = scel_color;

    detail['fillKey'] = key;//สีของพื้นที่นั้น
    detail['electoralVotes'] = vote;//จำนวนการ vote
    data[key] = detail;//เอา state แต่ละอันไปใส่ json อันใหม่เพื่อเรืยง
    //console.log(key+" "+detail['fillKey']);
    });
    Alldata['data'] = data;
    Alldata['fillColor'] = fillColor;
    Alldata['total_nokey'] = total_nokey;//รวมการ vote ที่ไม่มี keyword

    return Alldata;//คืนค้าพร้อม ที่แสดง แผนที่
}


//////////////////////////
/////////////////////////Data_PosNegMap
function Data_PosNegMap(datas){
  var Alldata ={};//data ข้อมูลแต่ละระรัฐพร้อม ส่งให้ Datamap_Usa เพื่อแสดง map
  var location = datas.location;

  /*for(var r in region){//เพื่อให้ รัฐ ที่ไม่มีใน mongo มีค่าเป็น 0
    try{//ค่าที่มามาตั้งแต่ mongo
      location[region[r]]['total'] = 0;
    }
    catch(err){//ใส่ให้เองตาม key เพิ่มใหม่เพราะ ไม่มี key นี้ใน Mongo
      location[region[r]] = {'total' : 0};
      location[region[r]] = {'pos' : 0,'neg' : 0};
    }
  }*/

  var data = {};
  var fillColor ={};

  var arr_vote = [];
  var max_vote =0;
  Object.keys(location).forEach(function(key) {
    if(key!="" && key !="USA" && key != null && key != 'null'){
      //arr_vote.push(location[key].pos + location[key].neg);
      var sum_vote = location[key].pos + location[key].neg;
      if(max_vote<sum_vote){
        max_vote = sum_vote;
      }
    }
  });
  //var max_vote = Math.max.apply(null, arr_vote);//เอา vote อันที่มากสุดตั้งใน การหาสี เข้มสุด
  Object.keys(location).forEach(function(key) {//loop get key
    var detail ={};
    //console.log(location[key].pos +" "+ location[key].neg);
    var pos_neg =  location[key].pos + location[key].neg;//รวม vote ทั้งหมด จาก pos neg
    var alpha  = 1;//((pos_neg/max_vote).toFixed(3)); //ความโปล่งใส .3 แหน่ง

    var pos = location[key].pos;//ค่า บวก
    var neg = location[key].neg;

    var scal_b = Math.ceil((pos/pos_neg)*255);//rate_pos
    if(pos == 0 && neg == 0){scal_b = 127;}// 0/0 หาค่าไม่ได้ ถ้า scal_b = 127 ,scal_r = 128 จะได้สีม่วงตรงกลาง
    var scal_r = 255-scal_b;//rate_neg
    var scel_color = 'rgba('+scal_r+', 0, '+scal_b+', '+alpha+')'; //หา scel ระดับสีของแต่ระรัฐ
    fillColor[scel_color] = scel_color;
    //console.log(scel_color);

    detail['fillKey'] = scel_color;//สีของพื้นที่นั้น
    detail['electoralVotes'] = "pos: "+location[key].pos +", neg: "+location[key].neg;//ค่าที่แสดงตอนชี้
    data[key] = detail;//เอา state แต่ละอันไปใส่ json อันใหม่เพื่อเรืยง
    //console.log(key+" "+detail['fillKey']);
    });
    Alldata['data'] = data;
    Alldata['fillColor'] = fillColor;
    return Alldata;//คืนค้าพร้อม ที่แสดง แผนที่
}


/////////////////////////////////////
////////////////////////////////////Data_Doughnut
function Data_Doughnut(datas){

    /* data{
          dataset[{
              data[],
              backgroundColor[],
              label =''
          }],
          labels[]
      }
    */
    var allData = {};
      /* */
        var datasets = [];
              var data = [];
              var backgroundColor= [];
              var label = "Doughnut Anic";
        var labels = [];
    for(var i in datas){//loop all keyword
            data.push(datas[i].sentiment.pos + datas[i].sentiment.neg); //คำ pos+negใน sentiment
            backgroundColor.push(color[i]);//เพิ่ม สีให้โดยเอามาจากช่อง array สี
            labels.push(datas[i].keyword);
    }
          var obj0 = {};
          obj0['data'] = data;
          obj0['backgroundColor'] = backgroundColor;
          obj0['label'] = label;
        datasets.push(obj0);
    allData['datasets'] = datasets;
    allData['labels'] = labels;

    Chart_Doughnut(allData);//เรียกให้แสดงผล กราฟโดนัด

    return allData;//คืนค่าพร้อมที่ โดนัสแสดงได้
}

//////////////////////////
/////////////////////////Data_PosNegArea
function Data_PosNegArea(datas,type){
  //   d.datetime.sort(function(a,b){
  //   // Turn your strings into dates, and then subtract them
  //   // to get a value that is either negative, positive, or zero.
  //   return new Date(b.date) - new Date(a.date);
  // });
    /* data{
            labels [],วันเวลา
            dataset [{
                    label : name,
                    borderColor :,
                    backgroundColor :,
                    data: [10,20..]
                  },
                  {
                    label : name,
                    borderColor :,
                    backgroundColor :,
                    data: [10,20..]
                  }
            ]
    }
    */
    var Alldata = [];

    var d = datas.datetime;//ฟิก ไว้เอามาเเค่อันเดียว
    var datetime = {};
    var data ={};
          var labels = [];
          //var dataset = [];
                //var label = d.keyword;
                var data_pos = [];
                var data_neg = [];

    ////////////////////////// days
    if(type === 'days'){//แสดง graph area เป็น แบบ วัน

      Object.keys(d).sort(function(a, b) {//เรียงวันที่ by key
          return moment(a, 'DD/MM/YYYY').toDate() - moment(b, 'DD/MM/YYYY').toDate();
        }).forEach(function(key) {
          datetime[key]= d[key];
      });


      //Object.keys(d.datetime).forEach(function(key) {//loop get key
      Object.keys(datetime).forEach(function(key_date) {//loop get date key
          labels.push(key_date);//fide labal datetime

          var date_pos = 0;// ผลรวม pos ของแต่ละ date
          var date_neg = 0;
          var time = datetime[key_date]; //time of day
          Object.keys(time).forEach(function(key_time) {//loop get time key
            date_pos+=datetime[key_date][key_time].pos;
            date_neg+=datetime[key_date][key_time].neg;
          });
          data_pos.push(date_pos);//ใส่ข้อมูลให้ data ที่เป็น pos
          data_neg.push(date_neg);

      });
//////////////////////
            //Object.keys(d.datetime).forEach(function(key) {//loop get key
          Object.keys(datetime).forEach(function(key) {//loop get key
              labels.push(key);//fide labal datetime
              data_pos.push(datetime[key].pos);//ใส่ข้อมูลให้ data ที่เป็น pos
              data_neg.push(datetime[key].neg);
          });
///////////////////
                  var dataset_pos = {};
                      dataset_pos['label'] = 'positive';
                      dataset_pos['borderColor'] = 'rgb(54, 162, 235)';
                      dataset_pos['backgroundColor'] = 'rgba(54, 162, 235, 0.5)';
                      dataset_pos['data'] = data_pos;

                  var dataset_neg = {};
                      dataset_neg['label'] = 'negative';
                      dataset_neg['borderColor'] = 'rgb(255, 99, 132)';
                      dataset_neg['backgroundColor'] = 'rgba(255, 99, 132, 0.5)';
                      dataset_neg['data'] = data_neg;


                  var dataset = [];
                  dataset.push(dataset_pos);
                  dataset.push(dataset_neg);
            data['labels'] = labels;
            data['datasets'] = dataset;

    }


    ////////////////////////// days
    if(type === 'days_ofusa'){//แสดง graph area เป็น แบบ วัน

      Object.keys(d).sort(function(a, b) {//เรียงวันที่ by key
          return moment(a, 'DD/MM/YYYY').toDate() - moment(b, 'DD/MM/YYYY').toDate();
        }).forEach(function(key) {
          datetime[key]= d[key];
      });


      //Object.keys(d.datetime).forEach(function(key) {//loop get key
      /*Object.keys(datetime).forEach(function(key_date) {//loop get date key
          labels.push(key_date);//fide labal datetime

          var date_pos = 0;// ผลรวม pos ของแต่ละ date
          var date_neg = 0;
          var time = datetime[key_date]; //time of day
          Object.keys(time).forEach(function(key_time) {//loop get time key
            date_pos+=datetime[key_date][key_time].pos;
            date_neg+=datetime[key_date][key_time].neg;
          });
          data_pos.push(date_pos);//ใส่ข้อมูลให้ data ที่เป็น pos
          data_neg.push(date_neg);

      });*/
//////////////////////
            //Object.keys(d.datetime).forEach(function(key) {//loop get key
          Object.keys(datetime).forEach(function(key) {//loop get key
              labels.push(key);//fide labal datetime
              data_pos.push(datetime[key].pos);//ใส่ข้อมูลให้ data ที่เป็น pos
              data_neg.push(datetime[key].neg);
          });
///////////////////
                  var dataset_pos = {};
                      dataset_pos['label'] = 'positive';
                      dataset_pos['borderColor'] = 'rgb(54, 162, 235)';
                      dataset_pos['backgroundColor'] = 'rgba(54, 162, 235, 0.5)';
                      dataset_pos['data'] = data_pos;

                  var dataset_neg = {};
                      dataset_neg['label'] = 'negative';

                      dataset_neg['borderColor'] = 'rgb(255, 99, 132)';
                      dataset_neg['backgroundColor'] = 'rgba(255, 99, 132, 0.5)';
                      dataset_neg['data'] = data_neg;


                  var dataset = [];
                  dataset.push(dataset_pos);
                  dataset.push(dataset_neg);
            data['labels'] = labels;
            data['datasets'] = dataset;

    }


    ///////////////////////////////// mins
    else if (type === 'hours') {

        Object.keys(d).sort(function(a, b) {//เรียงวันที่ by key
            return moment(a, 'DD/MM/YYYY').toDate() - moment(b, 'DD/MM/YYYY').toDate();
          }).forEach(function(key) {
          //datetime[key]= d[key];
            var dt = [];

            Object.keys(d[key]).forEach(function(key_h) {
              var HH = key_h.substring(0, 2)+":00:00";
              if(dt[HH] === undefined){//ชม ที่ยังไม่เคยมีมาก่อน
                dt[HH] = d[key][key_h];
              }
              else {// มี HH นี้แล้ว
                dt[HH].pos +=  d[key][key_h].pos;
                dt[HH].neg +=  d[key][key_h].neg;
              }

            });

            datetime[key] = dt;
        });

        //Object.keys(d.datetime).forEach(function(key) {//loop get key
        Object.keys(datetime).forEach(function(key_date) {//loop get date key

            var time = {}; //time of day
            Object.keys(datetime[key_date]).sort(function(a, b) {//เรียง time่ by key
                return moment(a, 'HH').toDate() - moment(b, 'HH').toDate();
              }).forEach(function(key) {
                time[key]= datetime[key_date][key];
            });

            Object.keys(time).forEach(function(key_time) {//loop get time key
              var time_pos = datetime[key_date][key_time].pos;// ผลรวม pos ของแต่ละ date
              var time_neg = datetime[key_date][key_time].neg;
              labels.push(key_date+" "+key_time);//fide labal datetime
              data_pos.push(time_pos);//ใส่ข้อมูลให้ data ที่เป็น pos
              data_neg.push(time_neg);
            });
        });

                    var dataset_pos = {};
                        dataset_pos['label'] = 'positive';
                        dataset_pos['borderColor'] = 'rgb(54, 162, 235)';
                        dataset_pos['backgroundColor'] = 'rgba(54, 162, 235, 0.5)';
                        dataset_pos['data'] = data_pos.slice(-24);//เอา 24 ชม ล่าสุด

                    var dataset_neg = {};
                        dataset_neg['label'] = 'negative';
                        dataset_neg['borderColor'] = 'rgb(255, 99, 132)';
                        dataset_neg['backgroundColor'] = 'rgba(255, 99, 132, 0.5)';
                        dataset_neg['data'] = data_neg.slice(-24);

                    var dataset = [];
                    dataset.push(dataset_pos);
                    dataset.push(dataset_neg);
              data['labels'] = labels.slice(-24);
              data['datasets'] = dataset;
    }

    ///////////////////////////////// mins
    else if (type === 'mins') {

        var length_min;//ขนาดความยาวของเวลาทั้งหมด
        Object.keys(d).sort(function(a, b) {//เรียงวันที่ by key
            return moment(a, 'DD/MM/YYYY').toDate() - moment(b, 'DD/MM/YYYY').toDate();
          }).forEach(function(key) {
            datetime[key] = d[key];
        });
        //Object.keys(d.datetime).forEach(function(key) {//loop get key
        Object.keys(datetime).forEach(function(key_date) {//loop get date key

            var time = {}; //time of day
            Object.keys(datetime[key_date]).sort(function(a, b) {//เรียง time่ by key
                return moment(a, 'HH:mm').toDate() - moment(b, 'HH:mm').toDate();
              }).forEach(function(key) {
                time[key]= datetime[key_date][key];
            });

            Object.keys(time).forEach(function(key_time) {//loop get time key
              var time_pos = datetime[key_date][key_time].pos;// ผลรวม pos ของแต่ละ date
              var time_neg = datetime[key_date][key_time].neg;
              labels.push(key_date+" "+key_time);//fide labal datetime
              data_pos.push(time_pos);//ใส่ข้อมูลให้ data ที่เป็น pos
              data_neg.push(time_neg);

            });
        });
                    var dataset_pos = {};
                        dataset_pos['label'] = 'positive';
                        dataset_pos['borderColor'] = 'rgb(54, 162, 235)';
                        dataset_pos['backgroundColor'] = 'rgba(54, 162, 235, 0.5)';
                        dataset_pos['data'] = data_pos.slice(-60);//เอา 60 นาทีล่าสุด

                    var dataset_neg = {};
                        dataset_neg['label'] = 'negative';
                        dataset_neg['borderColor'] = 'rgb(255, 99, 132)';
                        dataset_neg['backgroundColor'] = 'rgba(255, 99, 132, 0.5)';
                        dataset_neg['data'] = data_neg.slice(-60);

                    var dataset = [];
                    dataset.push(dataset_pos);
                    dataset.push(dataset_neg);

              data['labels'] = labels.slice(-60);
              data['datasets'] = dataset;
              console.log();
    }



    //Alldata.push(data);
    //data เป็นข้อมูลของเเต่ละชุด
    //Alldata เอาข้อมูลเเต่ละชุดมามัดรวม
  return data;
}


//////////////////////////
/////////////////////////Data_WordCloud
function Data_WordCloud(datas){
  var Alldata = [];
  /*  data:[
          {text:,
          size:
          },
          {text:,
          size:
          }
      ]
  */

    var d = datas.wordcloud;

    var data = [];
    var count = 0;
    Object.keys(d).forEach(function(key) {//loop get key
        var test = key;
        var size = 0;

        count++;
        if(count<=5){
          size = 45;
        }
        else if (count<=10&&count>5) {
          size = 35;
        }
        else if (count<=15&&count>10) {
          size = 25;
        }
        else if (count>15) {
          size =15;
        }

            var word = {};
            word['text'] = test;
            word['size'] = size;
        data.push(word);
    });

    //Alldata.push(data);

  return data;
}


//////////////////////////
/////////////////////////Data_WordCloud
function Data_Bar(datas){
  /*
  datasets: [{
      label: 'Dataset 1',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: window.chartColors.red,
      borderWidth: 1,
      data: [
          25,
          20,
          50,
          30,
          40,
          80,
          25
      ],
  }
  */

  var region = [
    ['AK','WA','OR','CA','NV','HI','UT','AZ','ID','MT','WY','CO','NM'],//West
    ['ND','SD','NE','KS','MN','IA','MO','WI','IL','IN','MI','OH'],//MiD-west
    ['TK','OK','AR','LA','MS','AL','TN','KY','WV','VA','NC','SC','GA','FL','DE','MD'],//South
    ['PA','NY','NJ','CT','VT','NH','ME','MA','RI'],//North-east
  ]


  var Alldata = {};
    var data_pos = {};
    var data_neg = {};
        var dataset_pos = [];
        var dataset_neg = [];

  data_pos['labels'] = ['West','Mid-west','South','North-east'];
  data_neg['labels'] = ['West','Mid-west','South','North-east'];

  for(var i in datas){
    var d = datas[i].location;
    var keyword = datas[i].keyword;


    var sum_west_pos=0,sum_mid_pos=0,sum_south_pos=0,sum_north_pos=0;
    var sum_west_neg=0,sum_mid_neg=0,sum_south_neg=0,sum_north_neg=0;
    var count_west=0,count_mid=0,count_south=0,count_north=0;
    Object.keys(d).forEach(function(k) {//loop get key // หาก ภาค
      if(k=='AK'||k=='WA'||k=='OR'||k=='CA'||k=='NV'||k=='HI'||k=='UT'||k=='AZ'||k=='ID'||k=='MT'||k=='WY'||k=='CO'||k=='NM'){//West
        sum_west_pos+=d[k].pos;
        sum_west_neg+=d[k].neg;
        count_west++;
      }
      else if (k=='ND'||k=='SD'||k=='NE'||k=='KS'||k=='MN'||k=='IA'||k=='MO'||k=='WI'||k=='IL'||k=='IN'||k=='MI'||k=='OH') {//MiD-west
        sum_mid_pos+=d[k].pos;
        sum_mid_neg+=d[k].neg;
        count_mid++;
      }
      else if (k=='TK'||k=='OK'||k=='AR'||k=='LA'||k=='MS'||k=='AL'||k=='TN'||k=='KY'||k=='WV'||k=='VA'
      ||k=='NC'||k=='SC'||k=='GA'||k=='FL'||k=='DE'||k=='MD') {//South
        sum_south_pos+=d[k].pos;
        sum_south_neg+=d[k].neg;
        count_south++;
      }
      else if (k=='PA'||k=='NY'||k=='NJ'||k=='CT'||k=='VT'||k=='NH'||k=='ME'||k=='MA'||k=='RI') {//North-east
        sum_north_pos+=d[k].pos;
        sum_north_neg+=d[k].neg;
        count_north++;
      }
    });

        var data_keyword_pos ={};
        data_keyword_pos['label'] = keyword;
        data_keyword_pos['backgroundColor'] = color[i];
        data_keyword_pos['borderColor'] = color[i];
        data_keyword_pos['borderWidth'] = 1;
            var d = [];
            d.push(sum_west_pos/count_west);//หาสัดส่วน
            d.push(sum_mid_pos/count_mid);
            d.push(sum_south_pos/count_south);
            d.push(sum_north_pos/count_north);
        data_keyword_pos['data'] = d;
        dataset_pos.push(data_keyword_pos);
    }

    data_pos['datasets'] = dataset_pos;
    Alldata['pos'] = data_pos;//แยกไว้ 2 อัน 2 กราฟ
    Alldata['neg'] = data_neg;
    return Alldata.pos;
}
