//code to read and set any environment variables with the dotenv package
require("dotenv").config();

//required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");

//code to access key information
var spotify = new Spotify(keys.spotify); //example Spotify url: http://open.spotify.com/track/b5e26f768da9407391038860d36d4a03
var omdb = new OMDB(keys.omdb); //example OMDB url: http://www.omdbapi.com/?i=tt3896198&apikey=b3c1ae5c
var bit = new BIT(keys.bit); //example Bands In Town url: https://rest.bandsintown.com/artists/celine+dion/events?app_id=8396314a71d3546f2e1279216e727634

console.log(spotify);
console.log(omdb);
console.log(bit);

//                  ********* GOAL **********
// Make it so liri.js can take in one of the following commands:

// concert-this         example: node liri.js concert-this '<band name here>'
// spotify-this-song    example: node liri.js spotify-this-song '<song name here>'
// movie-this           example: node liri.js movie-this '<movie name here>'
// do-what-it-says      example: node liri.js do-what-it-says

var nodeInputs = process.argv.slice(2).join(" ");
