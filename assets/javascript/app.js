
var ratios = [];
var cities = ["Denver"];

function sort() {
   ratios.sort(function(a, b){return b - a});
};






$("#search-btn").on("click", function(event) {
   event.preventDefault();

console.log("click")

var searchQuery= $("#user-input").val().trim();

   var queryURL = "https://api.foursquare.com/v2/venues/search?v=20161016&near=" + searchQuery + "&query=coffee&intent=checkin&client_id=53JNXQGSILECYWHP02QFXIXCU4ZDZJEAHB1HJ1KQ0F0DV3SM&client_secret=QRHTGAG2MYTXX2UPY0UTBTWAXFIFQWYWCGJSJG2M4ANVG01C";


   $.ajax({
    url: queryURL,
    method: "GET"
 })
   .done(function(response) {
    ratios = [];
    $("#info").empty();

    var info = response.response.venues;

    for (var i = 0; i < info.length; i++) {
       var venue = info[i];
       var stats = venue.stats;
       var total = stats.tipCount / stats.checkinsCount;
       venue.total = total;
    }

    info.sort(function(a, b) {
      return b.total - a.total;
   });

    for (var i = 0; i < info.length; i++) {
      var venue = info[i];

      $('#info').append('<div>' + venue.name + "<br>" + venue.total + '</div> <br>');
   };


         $("info").text(function() {
            return $(this).text().replace(undefined, "N/A")
         });


         console.log(info);
         console.log(venue.total);
      });
});