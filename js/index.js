$(document).ready(function() {
  getChannels();//display channels using the function described below
});
//URL for Twitch TV Streams
var urlStreams = "https://wind-bow.gomix.me/twitch-api/streams/";
//URL for Twitch TV Channels
var urlChannels = "https://wind-bow.gomix.me/twitch-api/channels/";

//Some twitch Users
var twitchUsers = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
  "pink_sparkles",
  "brunofin",
  "medrybw",
  "monstercat",
  "aces_tv",
  "loserfruit",
  "behkuhtv",
  "food",
  "fakename"
];

function getChannels() { //get data for channels
  twitchUsers.forEach(function(userName) {

    $.getJSON(urlStreams + userName, function(data) {
      var logstatus = [];
      var game = [];
      var viewers = [];
      if (data.stream === null || data.stream == undefined) {//offline channels
        logstatus = "Offline";
      } else {//online channels
        logstatus = "Online";
        game = data.stream.game; //name of game
        viewers = data.stream.viewers; //number of viewers 
      }

      $.getJSON(urlChannels + userName, function(data) {
        var name = [];
        var logo = [];
        var status = [];
        var url = [];
        var profileBanner = [];

        if (data.status === 404 || data.status === 422) {//channel does not exist
          status = "Channel Does Not Exist";
          //give the logo and banner of twitch
          logo = "https://maxcdn.icons8.com/Share/icon/Logos//twitch1600.png";
          name = userName;
          profileBanner = "https://maxcdn.icons8.com/Share/icon/Logos//twitch1600.png";
        } else {//if channel exists
          name = data.display_name;
          //if logo is empty then given it twitch logo
          logo = data.logo !== null ? data.logo : "https://maxcdn.icons8.com/Share/icon/Logos//twitch1600.png";
          status = data.status !== null ? data.status : "";
          //if profile banner does not exist then provide twitch logo
          profileBanner = data.profile_banner !== null ? data.profile_banner : "https://maxcdn.icons8.com/Share/icon/Logos//twitch1600.png";
          url = data.url;//channels link
        }
        //display the results as follows and also described by css file
        var userResults = "<a href='" + url + "' target='_blank' class="+logstatus+"><div style='background-image:url(" + profileBanner + ");' class='rows'><div class='col-xs-3'><img class='img-circle pull-left'  src='" + logo + "'/></div><div class='col-xs-9'><h4><strong>" + name + "</strong>: " + logstatus + "</h4><h5>" + game + "    Viewers:" + viewers + "</h5><p>" + status + "</p></div></div></a>";
        $("#results").append(userResults);
      }); // end of getting data from twitch channel url
    }); // end of getting data from twitch streaming url

  }); //end of each user from twitch users array
} //end of getChannel function

$("#online").click(function() {//if online tab is clicked then show online ones
  $(".Offline").fadeOut();
  $(".Online").fadeOut().slideDown();
});

$("#offline").click(function() {//if offline tab is clicked then show offline ones
  $(".Online").fadeOut();
  $(".Offline").fadeOut().slideDown();
});

$("#all").click(function() {//if all button is clicked then show all
  $(".Online").fadeOut().slideDown();
  $(".Offline").fadeOut().slideDown();
});