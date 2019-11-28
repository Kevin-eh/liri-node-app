require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var moment = require("moment");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var inputString = process.argv;
var liriChoice = inputString[2];
var userInput = process.argv.slice(3).join("+");

if (liriChoice === "movie-this") {
  axios
    .get(
      "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      console.log(
        "Movie Title: " +
          response.data.Title +
          "\nYear: " +
          response.data.Year +
          "\nIMDB Rating: " +
          response.data.imdbRating +
          "\nRotten Tomatoes Rating: " +
          response.data.Ratings[1].Value +
          "\nMade in: " +
          response.data.Country +
          "\nPlot: " +
          response.data.Plot +
          "\nActors: " +
          response.data.Actors
      );
    });
}

if (liriChoice === "concert-this") {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        userInput +
        "/events?app_id=trilogy"
    )
    .then(function(response) {
      //   console.log(response.data[0]);
      var m = moment(response.data[0].datetime, "YYYY-MM-DD");
      //   console.log(m);
      var mForm = m.format("MM / DD / YYYY");
      console.log(
        "Playing next at this venue: " +
          response.data[0].venue.name +
          "\nLocation of venue: " +
          response.data[0].venue.city +
          "\nDate: " +
          mForm
      );
    });
}

if (liriChoice === "spotify-this-song") {
  spotify.search({ type: "track", query: userInput, limit: 3 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    data.tracks.items.forEach(item => {
      item.album.artists.forEach(art => {
        console.log("Artist: " + art.name);
      });
      console.log("Song: " + item.name);
      console.log("Album: " + item.album.name);
      console.log("URL: " + item.preview_url);
    });
  });
}

if (liriChoice === "do-what-it-says") {
}
