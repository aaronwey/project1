// var ratios = [];
  // var cities = ["Denver"];

  // Initialize Firebase
  // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyAeN_TFadUAu1YbATQVRBfDeWAyM5mBuRQ",
  //   authDomain: "barista-project-1504977810719.firebaseapp.com",
  //   databaseURL: "https://barista-project-1504977810719.firebaseio.com",
  //   projectId: "barista-project-1504977810719",
  //   storageBucket: "barista-project-1504977810719.appspot.com",
  //   messagingSenderId: "263140035198"
  // };
  // firebase.initializeApp(config);
  // var database = firebase.database();
  // var cafeInfo;
  // function sort() {
   // ratios.sort(function(a, b){return b - a});
 // };
 // $("#search-btn").on("click", function(event) {
   // event.preventDefault();
   //to be used with googlemaps api
   // var map;
   
  //Response array to be used with googlemaps API
  // var venueArray = [];
  // console.log("click")
  // var searchQuery= $("#user-input").val().trim();
  // var queryURL = "https://api.foursquare.com/v2/venues/search?v=20161016&near=" + searchQuery + "&query=coffee&intent=checkin&client_id=53JNXQGSILECYWHP02QFXIXCU4ZDZJEAHB1HJ1KQ0F0DV3SM&client_secret=QRHTGAG2MYTXX2UPY0UTBTWAXFIFQWYWCGJSJG2M4ANVG01C";
  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // })
  // .done(function(response) {
  //   ratios = [];
  //   $("#info").empty();
  //   var info = response.response.venues;
  //   for (var i = 0; i < info.length; i++) {
  //    var venue = info[i];
  //    var stats = venue.stats;
  //    var total = stats.tipCount / stats.checkinsCount;
  //    venue.total = total;
     //pushing to the venueArray for googlemaps
     venueArray.push(venue);
   }
   // info.sort(function(a, b) {
    // return b.total - a.total;
  // });
   // for (var i = 0; i < info.length; i++) {
    // var venue = info[i];
;
                         //        cafeInfo = {
                         // venue: lat
                         //            }
   //                       $('#info').append('<div class="new-info">' 
   //                        + "Name: " + venue.name 
   //                        + "<br>" 
   //                        + "Phone #: " + venue.contact.formattedPhone
   //                        + "<br>" 
   //                        + "Address: " + venue.location.formattedAddress +"<br>" 
   //                        + "<br>"
   //                        + "Tip Ratio: " + venue.total 
   //                        + "<br>" 
   //                        + "Web-site: " + "<a href=" + venue.url + "venue.url>" + venue.url + "</a>"
   //                        + "<br>"
   //                        + "</div>");
   // //  $(".new-info").on("click", function (){
   //  event.preventDefault();
   //  database.ref().push(cafeInfo);
   //  console.log(cafeInfo);
   // });
 };
    //we can maybe use an if statment to not display the undefined results
        // if(venue.url == undefined) {
            //hide venue.url
        // };
        // console.log(info);
        // console.log(venue.total);
// Googlemaps API stuff
var marker, i;
var infowindow = new google.maps.InfoWindow();
var newCenter = new google.maps.LatLng(venueArray[0].location.lat, venueArray[0].location.lng);
map.setCenter(newCenter);
map.setZoom(15);

for (i = 0; i < venueArray.length; i++) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(venueArray[i].location.lat, venueArray[i].location.lng),
    map: map,
    html:
    '<div class="markerPop">'+
    venueArray[i].name + '<br>' +
    venueArray[i].location.formattedAddress + '<br>' +
    venueArray[i].contact.formattedPhone +
    '</div>'
  });
  
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(this.html);
    infowindow.open(map, this);
  });
};

// });
  function initMap() {
    var uluru = { lat: 0, lng: 0 };
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    }); 
  
  initMap();
// });