//code to read and set any environment variables with the dotenv package
require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var omdb = require("omdb");
var bitKey = keys.bit;
var bandsintown = require("bandsintown")(bitKey);

//required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");

//code to access key information
var spotify = new Spotify(keys.spotify); //example Spotify url: http://open.spotify.com/track/b5e26f768da9407391038860d36d4a03
var omdbKey = keys.omdb; //example OMDB url: http://www.omdbapi.com/?i=tt3896198&apikey=b3c1ae5c //example Bands In Town url: https://rest.bandsintown.com/artists/celine+dion/events?app_id=8396314a71d3546f2e1279216e727634

// console.log(spotify);
// console.log(omdbKey);
// console.log(bitKey);

//                  ********* GOAL **********
// Make it so liri.js can take in one of the following commands:

// concert-this         example: node liri.js concert-this '<band name here>'
// spotify-this-song    example: node liri.js spotify-this-song '<song name here>'
// movie-this           example: node liri.js movie-this '<movie name here>'
// do-what-it-says      example: node liri.js do-what-it-says

// var nodeInputs = process.argv.slice(2).join(" ");
var command = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

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
        // If the axios was successful...
        // Then log the body from the site!
        console.log(response.data[0]);
      });
    break;
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

  case "movie-this":
    // omdb.search("saw", function(err, movies) {
    //   if (err) {
    //     return console.error(err);
    //   }

    //   if (movies.length < 1) {
    //     return console.log("No movies were found!");
    //   }

    //   movies.forEach(function(movie) {
    //     console.log("%s (%d)", movie.title, movie.year);
    //   });
    // });
    axios
      .get("http://www.omdbapi.com/?i=tt3896198&apikey=" + bitKey)
      .then(function(response) {
        // If the axios was successful...
        // Then log the body from the site!
        console.log(response);
      });
    break;
  case "do-what-it-says":
    break;
}

// spotify.search({ type: "track", query: "All the Small Things" }, function(
//   err,
//   data
// ) {
//   if (err) {
//     return console.log("Error occurred: " + err);
//   }

//   console.log(data);
// });
