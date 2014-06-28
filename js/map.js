// DEFINE GLOBAL VARIABLES
var map;
var activeWindow;
var spainCities = [
  [40.4378271, -3.6795367, "Madrid", 'hello'],
  [42.8802049,-8.5447697, "Santiago de Compostela", 'hello'],
  [37.1809462,-3.5922032, "Granada", 'hello'],
  
  [42.8157659,-1.6500216, "Pamplona",
  '<br>' +
  '<span style="font-size:1.5em;"><b>Festival de San Fermin</b></span>' + '<br>' +
  '<p style="clear:both;"><i>“Romero’s bull-fighting gave real emotion, because he kept the absolute purity of line in his movements and always quietly and calmly let the horns pass him close each time. He did not have to emphasize their closeness. Brett saw how something that was beautiful done close to the bull was ridiculous if it were done a little way off. I told her how since the death of Joselito all the bull-fighters had been developing a technic that simulated this appearance of danger in order to give a fake emotional feeling, while the bull-fighter was really safe. Romero had the old thing, the holding of his purity of line through the maximum of exposure, while he dominated the bull by making him realize he was unattainable, while he prepared him for the killing.”</i></p>' +
  '― Ernest Hemingway, The Sun Also Rises' + '<br>' + '<br>' + 
  '<span style="margin-left:70px;">' + 
  '<iframe src="http://player.vimeo.com/video/10519968?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' +
  '</span>'
  ],

  [40.9634386,-5.6692121, "Salamanca", 'hello'],
  [39.8615727,-4.0304347, "Toledo", 'hello'],
  [43.3618741,-8.4126838, "A Coruña", 'hello'],
  [43.2633235,-2.9335643, "Bilbao", 'hello'],
  [42.2642347,2.9652438, "Figueres", 'hello'],
  
  [42.287072,3.2813409, "Cadaqués",
  '<br>' +
  '<span style="font-size:1.5em;"><b>Casa Salvador Dalí de Portlligat</b></span>' + '<br>' + '<br>' +
  '<img style="height:400px; width:300px;" src="http://4.bp.blogspot.com/-myf_clnkn14/UY7f4Q6Z80I/AAAAAAAAb2o/GRJgkW0YgBs/s1600/salvador_dali-galatea_of_the_spheres.jpg">' +
  '<img style="height:400px; width:300px;" src="http://1.bp.blogspot.com/-IzRPJQhQ5_U/UY7f8mQRsGI/AAAAAAAAb3Q/R8WDoG1SlnE/s1600/tumblr_mgl28ct2Di1qf8tqeo1_1280.jpg">' +
  '<iframe src="http://www.flickr.com/photos/jambrina_merino/4926498282/in/set-72157624804356526/player/" width="600" height="333" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>' +
  '<img style="clear:both; height:450px; width:600px;" src="http://2.bp.blogspot.com/-ot-HuTmvWV8/UY7l5lBGJTI/AAAAAAAAb4s/Z6gfjB9en5s/s1600/Dali-Gala-Portlligat-11.jpg">'
  ],

  [38.9073282,1.4296479, "Ibiza",
  '<br>' +
  '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/groups/474&amp;auto_play=false&amp;hide_related=false&amp;visual=true"></iframe>'
  ],

  [39.573793,2.6406497, "Palma de Mallorca", 'hello'],
  [39.4199137,-0.7888819, "Buñol", 'hello'],
  [37.05,-3.3, "Sierra Nevada", 'hello'],
  [28.1173607,-15.439617, "Las Palmas de Gran Canaria", 'hello']
]

// CALL FUNCTIONS
function initMap() {
  var layer = "watercolor";
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(37.1809462,-3.5922032),
    zoom: 5,
    mapTypeId: layer,
    mapTypeControlOptions: {
        mapTypeIds: [layer]
    },
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
    }
  });
  //Add Stamen.maps watercolor layer
  map.mapTypes.set(layer, new google.maps.StamenMapType(layer));
}

//Create city marker
function initMarker(Lat, Lng, Name, info) {
  var coordinate = new google.maps.LatLng(Lat, Lng);
  var marker = new google.maps.Marker({
    position: coordinate,
    map: map,
    title: Name,
    icon: {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      scale: 3,
      strokeColor: '#000',
      strokeWeight: 2
    },
  });
  //NEED TO FIX: Change marker color on mouseover
  // styleMarkers();
  //Create info window
  initInfo(marker, Name, info);
  //Add city marker to map
  marker.setMap(map);
}

//Get city marker coordinates
function displayMarkers(cities) {
  for(var i=0; i<cities.length; i++){
    initMarker(cities[i][0], cities[i][1], cities[i][2], cities[i][3]);
  };
}

//Create info windows for cities
function initInfo(Marker, cityName, Info) {
  var contentString = 
  '<div id="content">' + 
    '<h1 id="firstHeading" style="margin-left:20px;">' + '<b>' + cityName + '</b>' + '</h1>' + '<br>' + '<br>' + '<br>' +
    '<div class="bodyContent" style="margin-left:20px;">' +
      '<p>' + Info + '</p>' + 
    '</div>' + 
  '</div>';  
  var infowindow = new google.maps.InfoWindow({
    content: contentString,
    zIndex: 1000
  });

  google.maps.event.addListener(Marker, 'click', function() {
    //Close active window if exists 
    if(activeWindow != null) activeWindow.close(); 
    //Open new window 
    infowindow.open(map, Marker);
    //Store new window in global variable 
    activeWindow = infowindow;
  });
  
  //hover changes color
  google.maps.event.addListener(Marker, 'mouseover', function() {
      Marker.setIcon({
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 3,
        strokeColor: 'rgb(193,39,45)',
        strokeWeight: 2
      });
  });
  google.maps.event.addListener(Marker, 'mouseout', function() {
      Marker.setIcon({
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 3,
        strokeColor: '#000',
        strokeWeight: 2
      });
  });
}

$(document).ready(function() {
  initMap();
//display city markers
  displayMarkers(spainCities);

//Quote scroller
  $('blockquote').quovolver();
});