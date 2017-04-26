
//#################################################################### Map usa
var map;
function Datamap_Usa(usa,index){//show usa map

  map = new Datamap({
    scope: 'usa',
    element: document.getElementById("Datamap_Usa"),
    geographyConfig: {
      highlightFillColor: 'rgba(147,147,147,0.5)',//สีพื้นตรงรัฐ ตอน hover
      highlightBorderColor: 'rgba(147,147,147,1)',//สี border ตอนชี้
      borderColor: 'rgba(147,147,147,0.5)',//สี border

   popupTemplate: function(geography, data) {
      return '<div class="hoverinfo">' + geography.properties.name + ' Electoral Votes:' +  data.electoralVotes + ' '
    },
    highlightBorderWidth: 3
  },
  done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                alert(geography.properties.name);
            });
        },
        fills:usa.fillColor,
        data:usa.data
    });
    map.labels();
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
//var map_PosNeg = [];
  function Datamap_PosNeg(usa,index){//show usa map
    //$( ".keyword"+index ).append( "<div id='Datamap"+index+"_PosNeg' class='Datamap_PosNeg'></div>" );

    var map_PosNeg = new Datamap({
      scope: 'usa',
      element: document.getElementById("Datamap"+index+"_PosNeg"),
      geographyConfig: {
        highlightFillColor: 'rgba(147,147,147,0.5)',
        highlightBorderColor: 'rgba(147,147,147,1)',
        borderColor: 'rgba(147,147,147,0.5)',
     popupTemplate: function(geography, data) {
        return '<div class="hoverinfo">' + geography.properties.name + ' ' +  data.electoralVotes + ' '
      },
      highlightBorderWidth: 3
    },
    done: function(datamap) {
              datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                  alert(geography.properties.name);
              });
          },
          fills:usa.fillColor,
      data:usa.data
      });
      map_PosNeg.labels();
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
//#################################################################### End Map usa Pos neg


//#################################################################### Dounghnut
var Chart_Doughnut_data;
var chart_doughnut;
function Chart_Doughnut(data){
  data_test = data;

   var config = {
       type: 'doughnut',
       data: data,
       options: {
           responsive: true,
           legend: {
               position: 'top',
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
				title:{
					display:true,
					//text:"Chart.js Line Chart - Stacked Area"
				},
				tooltips: {
					mode: 'index',
				},
				hover: {
					mode: 'index'
				},
				scales: {
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						stacked: false,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
		};
		var ctx = document.getElementById("Chart"+index+"_PosNegArea");
		chart_posNegArea[index] = new Chart(ctx, config);
}

function Update_Chart_PosNegArea(data , index){
  Chart_PosNegArea_data[index].datasets = data.datasets;
  Chart_PosNegArea_data[index].labels = data.labels;
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
