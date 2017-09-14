  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAj02WWZv7Y48aG8f8_SeCkkyP99VEoriw",
    authDomain: "the-barista.firebaseapp.com",
    databaseURL: "https://the-barista.firebaseio.com",
    projectId: "the-barista",
    storageBucket: "",
    messagingSenderId: "520866055110"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  var ratios =  

  // var cities = ["Denver"];
  function sort() {
   ratios.sort(function(a, b){return b - a});
 };

 $("#search-btn").on("click", function(event) {
   event.preventDefault();

   var map;
   var venueArray = [];
   var cityEntered = $("#user-input").val().trim();
    // Uploads Train data to the database`
    database.ref().push(cityEntered);


    console.log(cityEntered);

    var $audioCharacter = document.createElement('audio');

    $audioCharacter.setAttribute('src', 'assets/audio/coffee.mp3');
    $audioCharacter.play();

    var searchQuery= $("#user-input").val().trim();
    var queryURL = "https://api.foursquare.com/v2/venues/search?v=20161016&near=" + searchQuery + "&query=coffee&intent=checkin&client_id=53JNXQGSILECYWHP02QFXIXCU4ZDZJEAHB1HJ1KQ0F0DV3SM&client_secret=QRHTGAG2MYTXX2UPY0UTBTWAXFIFQWYWCGJSJG2M4ANVG01C";

    $("#user-input").val("")

    $.ajax({
      url: queryURL,
      method: "GET"
    })

    .done(function(response) {

      ratios = [];

      $("#info").empty();

      var info = response.response.venues;

      console.log(response.response.venues)

      for (var i = 0; i < info.length; i++) {
       var venue = info[i];
       var stats = venue.stats;
       var total = stats.tipCount / stats.checkinsCount;
       venue.total = total.toFixed(5);

       venueArray.push(venue);

     }
     
     info.sort(function(a, b) {

      return b.total - a.total;

    });

     for (var i = 0; i < info.length; i++) {

      var venue = info[i];

      if (!venue.contact.formattedPhone) {
        venue.contact.formattedPhone = 'Unavailable';
      }

      console.log("******");
      console.log(venue.url);
      console.log("Web-site: " + "<a class='url-Remove' href=" + venue.url + "</a>");

      var newInfo = $('<div class="new-info">' 
        + "Name: " + venue.name 
        + "<br>" 
        + "Phone #: " + venue.contact.formattedPhone
        + "<br>" 
        + "Address: " + venue.location.formattedAddress 
        + "<br>"
        + "Tip Ratio: " + venue.total 
        + "<br>" 
        + "Website: <a href=" + venue.url + ">" + venue.url + "</a>" 
        + "</div>"
        );

      if (!venue.url) {
        newInfo.find('a').addClass('url-Remove');
      }

      $('#info').append(newInfo);

    };

// Googlemaps API stuff
var marker, j;
var infowindow = new google.maps.InfoWindow();
var newCenter = new google.maps.LatLng(venueArray[0].location.lat, venueArray[0].location.lng);
map.setCenter(newCenter);
map.setZoom(13);

for (j = 0; j < venueArray.length; j++) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(venueArray[j].location.lat, venueArray[j].location.lng),
    map: map,
    html:
    '<div class="markerPop">'+
    venueArray[j].name + '<br>' +
    venueArray[j].location.formattedAddress + '<br>' +
    venueArray[j].contact.formattedPhone +
    '</div>'
  });
  
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(this.html);
    infowindow.open(map, this);
  });
};

});

    function initMap() {
      var uluru = { lat: 0, lng: 0 };
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: uluru
      }); 
    };

    initMap();
  });
 