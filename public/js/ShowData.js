
///////////////////////////// Map usa
function Datamap_Usa(usa){//show usa map
  var map = new Datamap({
    scope: 'usa',
    element: document.getElementById('container1'),
    geographyConfig: {
   highlightBorderColor: '#bada55',
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


          fills: {
      'color4': '#CC0000',
      'color3': '#FF3333',
      'color2': '#FF6666',
      'color1': '#FF9999',
      'color0': '#FFCCCC',
      defaultFill: '#FFFFFF'
    },
    data:usa
    });
    map.labels();
	}


/////////////////////////// Dounghnut
function Chart_Doughnut(data){
   var config = {
       type: 'doughnut',
       data: data,
       options: {
           responsive: true,
           legend: {
               position: 'top',
           },
           title: {
               display: true,
               text: 'Chart.js Doughnut Chart'
           },
           animation: {
               animateScale: true,
               animateRotate: true
           }
       }
   };

 var ctx = document.getElementById("chart-area").getContext("2d");
 myDoughnut = new Chart(ctx, config);


}

///////////////////////// Area
function Chart_PosNegArea(data){
  //var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var config = {
			type: 'line',
			data: data,
			options: {
				responsive: true,
				title:{
					display:true,
					text:"Chart.js Line Chart - Stacked Area"
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

		var ctx = document.getElementById("all_area");

		window.myLine = new Chart(ctx, config);
}

///////////////////////// Area
function Chart_WordCloud(data){
  //http://bl.ocks.org/ericcoopey/6382449


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
       d3.select("body").append("svg")
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

//////////////////////////Chart_Bar
function Chart_Bar(data){



  var d = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
          label: 'Dataset 1',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
          data: [
              25,
              20,
              50,
              30,
              40,
              80,
              25
          ]
      }, {
          label: 'Dataset 2',
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
          data: [
                  25,
                  20,
                  50,
                  30,
                  40,
                  80,
                  25
          ]
      }]

  };

  console.log(d);

  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var color = Chart.helpers.color;
        var barChartData = data;

        window.onload = function() {
            var ctx = document.getElementById("bar").getContext("2d");
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
