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
