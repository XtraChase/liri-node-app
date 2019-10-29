//code to read and set any environment variables with the dotenv package
require("dotenv").config();
const fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");

//required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");

//code to access key information
var spotify = new Spotify(keys.spotify);
var omdbKey = keys.omdb;
var bitKey = keys.bit;
var command = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

// concert-this         example: node liri.js concert-this '<band name here>'
switch (command) {
  case "concert-this":
    axios
      .get(
        "https://rest.bandsintown.com/artists/" +
          encodeURI(searchTerm) +
          "/events?app_id=" +
          bitKey
      )
      .then(function(response) {
        console.log(response.data[0]);
      });
    break;

  // spotify-this-song    example: node liri.js spotify-this-song '<song name here>'
  case "spotify-this-song":
    spotify.search({ type: "track", query: searchTerm, limit: 1 }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      console.log(data.tracks.items[0]);
    });
    break;

  // movie-this           example: node liri.js movie-this '<movie name here>'
  case "movie-this":
    axios
      .get("http://www.omdbapi.com/?i=tt3896198&apikey=" + omdbKey.id)
      .then(function(response) {
        console.log(response);
      });
    break;

  // do-what-it-says      example: node liri.js do-what-it-says
  case "do-what-it-says":
    spotify.search(
      {
        type: "track",
        query: fs.readFileSync("./random.txt", { encoding: "utf8" }),
        limit: 1
      },
      function(err, data) {
        if (err) {
          return console.log("Error occurred: " + err);
        }
        console.log(data.tracks.items[0]);
      }
    );
    break;
}
