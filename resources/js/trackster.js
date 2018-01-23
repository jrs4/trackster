// http://ws.audioscrobbler.com/2.0/?method=track.search&track=sonata&api_key=1ba274f344d11ff1e30ee52e542b2ac3&format=json
var Trackster = {};
var API_KEY = "1ba274f344d11ff1e30ee52e542b2ac3";

$(document).ready(function(){
  $("#search").click(function(){
    $("h1").css("color", "rgb(0,0,171)");
    var $input = $("input").val();
    Trackster.searchTracksByTitle($input);
  });

  $("input").keydown(function(event){
    if ( event.which == 13 ) {
      var $input = $("input").val();
      Trackster.searchTracksByTitle($input);
    }
  });

  $("#results").empty();
});


/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  $("#results").empty();

  for (var i = 0; i < tracks.length; i++) {
    var htmlTrackRow =
    '<div class="row flex result">' +
    '  <div class="col-xs-1 col-xs-offset-1">' +
    '    <a href="' + tracks[i].url + '" target="_blank">' +
    '      <i class="flex fa fa-play-circle-o" aria-hidden="true" id="play"></i>' +
    '    </a>' +
    '  </div>' +
    '  <div class="col-xs-4">' + tracks[i].name + '</div>' +
    '  <div class="col-xs-2">' + tracks[i].artist + '</div>' +
    '  <div class="col-xs-2"><img src="' + tracks[i].image[1]['#text'] + '" alt=""></div>' +
    '  <div class="col-xs-2">' + numeral(tracks[i].listeners).format('0 a') + '</div>' +
    '</div>';

    $("#results").append(htmlTrackRow);
  }
  $("h1").css("color", "rgb(255,0,171)");
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url : "https://ws.audioscrobbler.com/2.0/?method=track.search&track=" + title + "&api_key=" + API_KEY + "&format=json",
    datatype : "jsonp",
    success : function(data){
      console.log(data);
      Trackster.renderTracks(data.results.trackmatches.track);
    }
  });
};
