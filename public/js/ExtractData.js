var color =[
  'rgb(255, 99, 132)',//red
  'rgb(255, 159, 64)',//orange
  'rgb(255, 205, 86)',//yellow
  'rgb(75, 192, 192)',//green
  'rgb(54, 162, 235)',//blue
  'rgb(153, 102, 255)',//purple
  'rgb(231,233,237)'//grey
];
////////////////////////////
////////////////////////////Data_UsaVote
function Data_UsaVote(datas) {//หารูปแบบ data ให้ Datamap_Usa
  var Alldata ={};//data ข้อมูลแต่ละระรัฐพร้อม ส่งให้ Datamap_Usa เพื่อแสดง map
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
    Alldata[key] = detail;//เอา state แต่ละอันไปใส่ json อันใหม่เพื่อเรืยง
    //console.log(key+" "+detail['fillKey']);
    });
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
function Data_PosNegArea(datas){
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

  for(var i in datas){

    var d = datas[i].datetime;//ฟิก ไว้เอามาเเค่อันเดียว
    var date = {};
    Object.keys(d).sort().forEach(function(key) {
      date[key]= d[key];
      });


    var data ={};
          var labels = [];
          //var dataset = [];
                //var label = d.keyword;
                var data_pos = [];
                var data_neg = [];
    //Object.keys(d.datetime).forEach(function(key) {//loop get key
    Object.keys(date).forEach(function(key) {//loop get key
        labels.push(key);//fide labal datetime
        data_pos.push(date[key].pos);//ใส่ข้อมูลให้ data ที่เป็น pos
        data_neg.push(date[key].neg);
    });

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
    Alldata.push(data);
  }

  return Alldata[1];
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

  for(var i in datas){
    var d = datas[i].wordcloud;

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

    Alldata.push(data);
  }
  return Alldata[1];
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
      else if (k=='TK'||k=='OK'||k=='AR'||k=='LA'||k=='MS'||k=='AL'||k=='TN'||k=='KY'||k=='WV'||k=='VA'||k=='NC'||k=='SC'||k=='GA'||k=='FL'||k=='DE'){//||k='MD') {//South
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

    console.log(Alldata.pos);

    return Alldata.pos;

}
