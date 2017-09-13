var ratios = [];
// var cities = ["Denver"];

function sort() {
 ratios.sort(function(a, b){return b - a});
};

$("#search-btn").on("click", function(event) {
 event.preventDefault();


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

    });

});