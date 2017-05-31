
//#################################################################### Map usa
var map;
function Datamap_Usa(usa){//show usa map

  map = new Datamap({
    scope: 'usa',
    height: null, //if not null, datamaps will grab the height of 'element'
    width: null, //if not null, datamaps will grab the width of 'element'
    responsive: true,
    element: document.getElementById("Datamap_Usa"),
    geographyConfig: {
      highlightFillColor: 'rgba(147,147,147,0.5)',//สีพื้นตรงรัฐ ตอน hover
      highlightBorderColor: 'rgba(147,147,147,1)',//สี border ตอนชี้
      borderColor: 'rgba(147,147,147,0.5)',//สี border
   popupTemplate: function(geography, data) {

      return '<div class="hoverinfo">' + geography.properties.name + ' : ' +  fide_to_commar(data.electoralVotes) + ' ข้อความ'
    },
    highlightBorderWidth: 3
  },
  done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                //alert(geography.properties.name);
            });
        },
        fills:usa.fillColor,
        data:usa.data
    });
        // Alternatively with d3
     d3.select(window).on('resize', function() {
         map.resize();
     });
    map.labels({labelColor: '#000', fontSize: 15});
  }

  function Summary_Datamap_Usa(data){

    var table = $('#Summary_Datamap_Usa');
    table.html("<thead> <tr> <th class='text_l'><h3><strong>#</strong></h3></th> <th><h3><strong>รัฐ</strong></h3></th> <th class='text_r'><h3><strong>จำนวน</strong></h3></th></tr> </thead>");//ล้างค่า ใร element และ เพิ่ม หัวข้อ
    var top_state = data.sort_list_state.slice(0, 5); //เอา state ที่มีการ vote มากที่สุด 5 รัฐมา
    for(var i in top_state){
      var rank = parseInt(i)+1;
      if(i==0){//ถ้าเป็น อันดับ แรกที่มากสุดจะตัวใหญ่
        var element = "<tr>"+
                        "<td class='rank_1 text_l'><h2>"+rank+"</h2></td>"+
                        "<td class='rank_1 text_l'><h2>"+get_state(top_state[i].state)+" </h2></td>"+
                        "<td class='rank_1 text_r'><h2>"+fide_to_commar(top_state[i].vote)+" ข้อความ</h2></td>"+
                      "</tr>";
      }
      else if(i==1) {
        var element = "<tr>"+
                        "<td class='rank_2 text_l'><h2>"+rank+"</h2></td>"+
                        "<td class='rank_2 text_l'><h2>"+get_state(top_state[i].state)+" </h2></td>"+
                        "<td class='rank_2 text_r'><h2>"+fide_to_commar(top_state[i].vote)+" ข้อความ</h2></td>"+
                      "</tr>";
      }
      else {
        var element = "<tr>"+
                        "<td class='rank_3 text_l'><h2>"+rank+"</h2></td>"+
                        "<td class='rank_3 text_l'><h2>"+get_state(top_state[i].state)+" </h2></td>"+
                        "<td class='rank_3 text_r'><h2>"+fide_to_commar(top_state[i].vote)+" ข้อความ</h2></td>"+
                      "</tr>";
      }


      table.append(element);
    }




  }

  function Update_Datamap_Usa(usa){
    var data = usa.data;
    var fills = usa.fillColor;

    var electoralVotes = {};
    var fill = {};

    Object.keys(data).forEach(function(key) {
      electoralVotes[key] = {'electoralVotes' : data[key].electoralVotes};
      fill[key] = fills[key];
    });

    map.updateChoropleth(electoralVotes);
    map.updateChoropleth(fill);
  }
//#################################################################### End Map usa



//#################################################################### Map usa Pos neg เทียบกัน ของแต่ละ keyword
  var map_PosNeg = [];
  function Datamap_PosNeg(usa,index){//show usa map
    //$( ".keyword"+index ).append( "<div id='Datamap"+index+"_PosNeg' class='Datamap_PosNeg'></div>" );

    map_PosNeg[index] = new Datamap({
      scope: 'usa',
      height: null, //if not null, datamaps will grab the height of 'element'
      width: null, //if not null, datamaps will grab the width of 'element'
      responsive: true,
      element: document.getElementById("Datamap"+index+"_PosNeg"),
      geographyConfig: {
        highlightFillColor: 'rgba(147,147,147,0.5)',
        highlightBorderColor: 'rgba(147,147,147,0.5)',
        borderColor: 'rgba(255,255,255,1)',
     popupTemplate: function(geography, data) {
        return '<div class="hoverinfo">' + geography.properties.name + ' ' +  fide_to_commar(data.electoralVotes)+ ' '
      },
      highlightBorderWidth: 3
    },
    function(datamap) {
              datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                  alert(geography.properties.name);
              });
          },
          fills:usa.fillColor,
      data:usa.data
      });
          // Alternatively with d3
       d3.select(window).on('resize', function() {
           map_PosNeg[index].resize();
       });
      map_PosNeg[index].labels({labelColor: '#000', fontSize: 16});

  	}

    function Update_Datamap_PosNeg(usa,i){
      var data = usa.data;
      var fills = usa.fillColor;

      var electoralVotes = {};
      var fill = {};
      Object.keys(data).forEach(function(key) {
        electoralVotes[key] = {'electoralVotes' : data[key].electoralVotes};
        fill[key] = fills[key];
      });


      map_PosNeg[i].updateChoropleth(electoralVotes);
      map_PosNeg[i].updateChoropleth(fill);
    }

    function Summary_Datamap_PosNeg(data,index){

      var table_pos = $('#Summary_Datamap_PosNeg_pos'+index);
      table_pos.html("<thead> <tr> <th><h3><strong>#</strong></h3></th> <th class='text_l'><h3><strong>คำค้นหา</strong></h3></th> <th class='text_r'><h3><strong>สัดส่วน</strong></h3></th></tr> </thead>");
      var table_neg = $('#Summary_Datamap_PosNeg_neg'+index);
      table_neg.html("<thead> <tr> <th><h3><strong>#</strong></h3></th> <th class='text_l'><h3><strong>คำค้นหา</strong></h3></th> <th class='text_r'><h3><strong>สัดส่วน</strong></h3></th></tr> </thead>");
      var top_pos = data.scal_pos.slice(0, 5); //เอา state ที่มีการ vote มากที่สุด 5 รัฐมา
      var top_neg = data.scal_neg.slice(0, 5);
      //top pos
      for(var i in top_pos){
        var rank = parseInt(i)+1;
        if(i==0){//ถ้าเป็น อันดับ แรกที่มากสุดจะตัวใหญ่
          var element = "<tr>"+
                          "<td class='rank_1'><h2>"+rank+"</h2></td>"+
                          "<td class='rank_1'><h2>"+get_state(top_pos[i].state)+"</h2></td>"+
                          "<td class='rank_1 text_r'><h2>"+(top_pos[i].scal*100).toFixed(2)+" %</h2></td>"+
                        "</tr>";
        }
        else if(i==1) {
          var element = "<tr>"+
                          "<td class='rank_2'><h2>"+rank+"</h2></td>"+
                          "<td class='rank_2'><h2>"+get_state(top_pos[i].state)+"</h2></td>"+
                          "<td class='rank_2 text_r'><h2>"+(top_pos[i].scal*100).toFixed(2)+" %</h2></td>"+
                        "</tr>";
        }
        else {
          var element = "<tr>"+
                          "<td class='rank_3'><h2>"+rank+"</h2></td>"+
                          "<td class='rank_3'><h2>"+get_state(top_pos[i].state)+"</h2></td>"+
                          "<td class='rank_3 text_r'><h2>"+(top_pos[i].scal*100).toFixed(2)+" %</h2></td>"+
                        "</tr>";
        }
        table_pos.append(element);
      }
      //top neg
      for(var i in top_neg){
        var rank = parseInt(i)+1;
        if(i==0){//ถ้าเป็น อันดับ แรกที่มากสุดจะตัวใหญ่
          var element = "<tr>"+
                          "<td class='rank_1'><h2>"+rank+"</h2></td>"+
                          "<td class='rank_1'><h2>"+get_state(top_neg[i].state)+"</h2></td>"+
                          "<td class='rank_1 text_r'><h2>"+(top_neg[i].scal*100).toFixed(2)+" %</h2></td>"+
                        "</tr>";
        }
        else if(i==1) {
          var element = "<tr>"+
                          "<td class='rank_2'><h2>"+rank+"</h2></td>"+
                          "<td class='rank_2'><h2>"+get_state(top_neg[i].state)+"</h2></td>"+
                          "<td class='rank_2 text_r'><h2>"+(top_neg[i].scal*100).toFixed(2)+" %</h2></td>"+
                        "</tr>";
        }
        else {
          var element = "<tr>"+
                          "<td class='rank_3'><h2>"+rank+"</h2></td>"+
                          "<td class='rank_3'><h2>"+get_state(top_neg[i].state)+"</h2></td>"+
                          "<td class='rank_3 text_r'><h2>"+(top_neg[i].scal*100).toFixed(2)+" %</h2></td>"+
                        "</tr>";
        }
        table_neg.append(element);
      }


    }


//#################################################################### End Map usa Pos neg


//#################################################################### Dounghnut
var Chart_Doughnut_data;
var chart_doughnut;
function Chart_Doughnut(data){
  data_test = data;

   var config = {
       type: 'pie',
       data: data,
       options: {
           responsive: true,
           legend: {
               position: 'bottom',
               labels: {
                 fontSize : 20
                }
           },
           tooltips: {
              mode: 'index',
              bodyFontSize :20,
              callbacks: {
                  label: function(tooltipItem, data) {
                    return data.labels[tooltipItem.index]+" : "+fide_to_commar(data.datasets[0].data[tooltipItem.index])+" ข้อความ";
                  }
              },
           },
           title: {
               //display: true,
               //text: 'Chart.js Doughnut Chart'
           },
           animation: {
               animateScale: true,
               animateRotate: true
           }
       }
   };

 var ctx = document.getElementById("Chart_Doughnut").getContext("2d");
 chart_doughnut = new Chart(ctx, config);
}

function Summary_Chart_Doughnut(label,data){//สรุปมาเป็น %
  var table = $('#Summary_Chart_Doughnut');
  table.html("<thead> <tr> <th><h3><strong>#</strong></h3></th> <th><h3><strong>คำค้นหา</strong></h3></th>  <th class='text_r'><h3><strong>สัดส่วน</strong></h3></th> </tr> </thead>");
  for(var i in data){
    var rank = parseInt(i)+1;
    if(i==0){//ถ้าเป็น อันดับ แรกที่มากสุดจะตัวใหญ่
      var element = "<tr>"+
                      "<td class='rank_1'><h2>"+rank+"</h2></td>"+
                      "<td class='rank_1'><h2>"+data[i].keyword+"</h2></td>"+
                      "<td class='rank_1 text_r'><h2>"+data[i].persen+"%</h2></td>"+

                    "</tr>";
    }
    else if(i==1){
      var element = "<tr>"+
                      "<td class='rank_2'><h2>"+rank+"</h2></td>"+
                      "<td class='rank_2'><h2>"+data[i].keyword+"</h2></td>"+
                      "<td class='rank_2 text_r'><h2>"+data[i].persen+"%</h2></td>"+
                    "</tr>";
    }
    else {
      var element = "<tr>"+
                      "<td class='rank_3'><h2>"+rank+"</h2></td>"+
                      "<td class='rank_3'><h2>"+data[i].keyword+"</h2></td>"+
                      "<td class='rank_3 text_r'><h2>"+data[i].persen+"%</h2></td>"+
                    "</tr>";
    }
    table.append(element);//เพิ่ม row
  }
}

//function update ช้อมูลแบบ realtime
function Update_Chart_Doughnut(data){
  Chart_Doughnut_data = data;
  chart_doughnut.update();//ให้ กราฟ donut ทำการ update เป็นข้อมูลใหม่
}
//#################################################################### End Dounghnut


//#################################################################### PosNegArea
//ตัวแปลที่ประกาศเป็น array สำหรับไว้ update ฬนแต่ละ keyword
var chart_posNegArea = [];
var Chart_PosNegArea_data = [];
function Chart_PosNegArea(data,index){
  //var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //$( ".keyword_"+index ).append( "<canvas id='Chart"+index+"_PosNegArea'></canvas>" );
    Chart_PosNegArea_data[index] = data;//เก็บตัวแปลเอาไว้สำหรับ update ได้

		var config = {
			type: 'line',
			data: data,
			options: {
				responsive: true,
        backgroundColor: "rgba(0,0,0,1)",
        legend: {
            position: 'top',
            labels: {
              fontSize : 25
         }
       },
				title:{
					display:true,
					//text:"Chart.js Line Chart - Stacked Area"
				},
				tooltips: {
					mode: 'index',
          titleFontSize : 25,
          bodyFontSize :20,
          callbacks: {
              label: function(tooltipItem, data) {
                return data.datasets[tooltipItem.datasetIndex].label+" "+fide_to_commar(tooltipItem.yLabel)+" ข้อความ";
              }
          }
				},
				hover: {
					mode: 'index'
				},

				scales: {
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'ช่วงเวลา',
              fontSize: 20
						},
          ticks: {
                  fontSize: 15,
              }
					}],
					yAxes: [{
						stacked: false,
						scaleLabel: {
							display: true,
							labelString: 'ความคิดเห็น',
              fontSize: 20
						},
        ticks: {
                fontSize: 15,
                callback: function(label, index, labels) {if (label % 1 === 0) {return fide_to_commar(label);}}
            }
					}]
				}
			}
		};
		var ctx = document.getElementById("Chart"+index+"_PosNegArea").getContext("2d");
		chart_posNegArea[index] = new Chart(ctx, config);
}

function Update_Chart_PosNegArea(data, index){
  Chart_PosNegArea_data[index].datasets = data.datasets;
  Chart_PosNegArea_data[index].labels = data.labels;
  //type_time = type;
  chart_posNegArea[index].update();
}
//#################################################################### End PosNegArea



//#################################################################### Wordcloud
function Chart_WordCloud(data,index){
  //http://bl.ocks.org/ericcoopey/6382449

  //$( ".keyword"+index ).append( "<div id='Chart"+index+"_WordCloud'></div>" );

   var color = d3.scale.linear()
           .domain([0,1,2,3,4,5,6,10,15,20,100])
           .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

   d3.layout.cloud().size([800, 300])
           .words(data)
           .rotate(0)
           .fontSize(function(d) { return d.size; })
           .on("end", draw)
           .start();

   function draw(words) {
       d3.select("#Chart"+index+"_WordCloud").append("svg")
               .attr("width", 850)
               .attr("height", 350)
               .attr("class", "wordcloud")
               .append("g")
               // without the transform, words words would get cutoff to the left and top, they would
               // appear outside of the SVG area
               .attr("transform", "translate(320,200)")
               .selectAll("text")
               .data(words)
               .enter().append("text")
               .style("font-size", function(d) { return d.size + "px"; })
               .style("fill", function(d, i) { return color(i); })
               .attr("transform", function(d) {
                   return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
               })
               .text(function(d) { return d.text; });
   }
}

function Update_Chart_WordCloud(data,index){
  var color = d3.scale.linear()
          .domain([0,1,2,3,4,5,6,10,15,20,100])
          .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

  d3.layout.cloud().size([800, 300])
          .words(data)
          .rotate(0)
          .fontSize(function(d) { return d.size; })
          .on("end", draw)
          .start();

  function draw(words) {
      $("#Chart"+index+"_WordCloud").html("");
      d3.select("#Chart"+index+"_WordCloud").append("svg")
              .attr("width", 850)
              .attr("height", 350)
              .attr("class", "wordcloud")
              .append("g")
              // without the transform, words words would get cutoff to the left and top, they would
              // appear outside of the SVG area
              .attr("transform", "translate(320,200)")
              .selectAll("text")
              .data(words)
              .enter().append("text")
              .style("font-size", function(d) { return d.size + "px"; })
              .style("fill", function(d, i) { return color(i); })
              .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
              .text(function(d) { return d.text; });
  }
}

function Summary_Chart_WordCloud(d,index){
  var table = $('#Summary_Chart_WordCloud'+index);
  table.html("<thead> <tr> <th><h3><strong>#</strong></h3></th> <th><h3><strong>คำค้นหา</strong></h3></th> <th class='text_r'><h3><strong>จำนวน</strong></h3></th></tr> </thead>");
  var data = d.slice(0, 5);
  for(var i in data){
    var rank = parseInt(i)+1;
    if(i==0){//ถ้าเป็น อันดับ แรกที่มากสุดจะตัวใหญ่
      var element = "<tr>"+
                      "<td class='rank_1'><h2>"+rank+"</h2></td>"+
                      "<td class='rank_1'><h2>"+data[i].text+"</h2></td>"+
                      "<td class='rank_1 text_r'><h2>"+fide_to_commar(data[i].feq)+" คำ</h2></td>"+

                    "</tr>";
    }
    else if(i==1){
      var element = "<tr>"+
                      "<td class='rank_2'><h2>"+rank+"</h3></td>"+
                      "<td class='rank_2'><h2>"+data[i].text+"</h3></td>"+
                      "<td class='rank_2 text_r'><h2>"+fide_to_commar(data[i].feq)+" คำ</h3></td>"+
                    "</tr>";
    }
    else {
      var element = "<tr>"+
                      "<td class='rank_3'><h2>"+rank+"</h2></td>"+
                      "<td class='rank_3'><h2>"+data[i].text+"</h2></td>"+
                      "<td class='rank_3 text_r'><h2>"+fide_to_commar(data[i].feq)+" คำ</h2></td>"+
                    "</tr>";
    }
    table.append(element);//เพิ่ม row
  }
}

//#################################################################### End Wordcloud

//####################################################################Chart_Bar
function Chart_Bar(data){

  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var color = Chart.helpers.color;
        var barChartData = data;

        window.onload = function() {
            var ctx = document.getElementById("Chart_Bar").getContext("2d");
            window.myBar = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    responsive: true,
                    scales: {
                        yAxes: [{ticks: {min: 0}}]
                    },
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Bar Chart'
                    }
                }
            });

        };
}

//#################################################################### End Chart_Bar


//#################################################################### Start Chart_gauge
////////http://c3js.org/samples/chart_gauge.html
  var chartGauge;
  function Chart_Gauge(data){
    chartGauge = c3.generate({
          bindto: '#Chart_Gauge',
          data: {
              columns: [
                  ['ข้อความใน สหรัฐอเมริกา', data.scal_of_usa]
              ],
              type: 'gauge'
              //onclick: function (d, i) { console.log("onclick", d, i); },
              //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
              //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
          },
          gauge: {
              label: {
                  format: function(value, ratio) {
                      return value +" %";
                  },
                  show: false // to turn off the min/max labels.
              }
      //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
      //    max: 100, // 100 is default
      //    units: ' %',
      //    width: 39 // for adjusting arc thickness
          },
          tooltip: {
              format: {
                value: function (value, ratio, id, index) { return fide_to_commar(data.total_of_usa)+" ข้อความ"; }
              }
            },
          color: {
              pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
              threshold: {
      //            unit: 'value', // percentage is default
      //            max: 200, // 100 is default
                  values: [30, 60, 90, 100]
              }
          },
          size: {
              height: 180
          }
      });

  }
  function Update_Chart_Gauge(data) {
    chartGauge.load({
        columns: [['ข้อความใน สหรัฐอเมริกา', data.scal_of_usa]]
    });
  }
  function Summary_Chart_Gauge(data){

    var element_total = $('#total');//ทำการ แสดงจำนวนการ vote ที่ไม่ได้อยู่ใน map
    element_total.html("");
    element_total.append(fide_to_commar(data.total_of_usa+data.total_out_of_usa));//fide_to_roman ทำให้ย่อตัวเลขได้
    var element_total_of_usa = $('#total_of_usa');//ทำการ แสดงจำนวนการ vote ที่ไม่ได้อยู่ใน map
    element_total_of_usa.html("");
    element_total_of_usa.append(fide_to_commar(data.total_of_usa));//fide_to_roman ทำให้ย่อตัวเลขได้
    var element_total_out_of_usa = $('#total_out_of_usa');//ทำการ แสดงจำนวนการ vote ที่ไม่ได้อยู่ใน map
    element_total_out_of_usa.html("");
    element_total_out_of_usa.append(fide_to_commar(data.total_out_of_usa));
  }
  //#################################################################### End Chart_gauge






function fide_to_roman(num){//แปลงรูปตัวเลขให้อยู่ดุง่าย
  //ย่อ จำนวนการ vote ที่อยู่ใน usa
  if(num >= 1000000){// >1M
    num = (num/1000000).toFixed(2)+" ล้าน";
  }
  else if (num >= 1000) {
    num = (num/1000).toFixed(2)+" K";
  }
  return num;
}

function fide_to_commar(num){
  if(num >= 1000000){// >1M
    return (num/1000000).toFixed(2)+" ล้าน";
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


var _region ={'AL':'Alabama', 'AK':'Alaska', 'AZ':'Arizona', 'AR':'Arkansas','CA':'California','CO':'Colorado', 'CT':'Connecticut', 'DE':'Delaware', 'FL':'Florida',
 'GA':'Georgia', 'HI':'Hawaii', 'ID':'Idaho', 'IL':'Illinois', 'IN':'Indiana', 'IA':'Iowa','KS':'Kansas','KY':'Kentucky', 'LA':'Louisiana' , 'ME':'Maine',
 'MA':'Massachusetts', 'MI':'Michigan', 'MN':'Minnesota', 'MS':'Mississippi', 'MO':'Missouri','MT':'Montana','MD':'Maryland', 'NE':'Nebraska','NV':'Nevada',
 'NH':'New Hampshire', 'NJ':'New Jersey', 'NM':'New Mexico', 'NY':'New York', 'NC':'North Carolina', 'ND':'North Dagota', 'OH':'Ohio', 'OK':'Oklahoma',
 'OR':'Oregon', 'PA':'Pennsylvania', 'RI':'Rhode Island', 'SC':'South Carolina', 'SD':'South Dagota', 'TN':'Tennessee', 'TX':'Texas', 'UT':'Utah',
 'VT':'Vermont', 'VA':'Virginia', 'WA':'Washington', 'WV':'West Virginia', 'WI':'Wisconsin', 'WY':'Wyoming'};
function get_state(r){//parametor เป็น ชื่อย่อ return ชื่อเต็ม
return _region[r];
}
