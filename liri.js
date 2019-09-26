require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var fs = require("fs");

inquirer
    .prompt([
        {
            type: "list",
            message: "Please select a command to run.",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "options"
        }
    ])
    .then(function(result){

        if (result.options === "concert-this") {
            concertThis();
        }

        if (result.options === "spotify-this-song") {
            spotifyThisSong();
        }

        if (result.options === "movie-this") {
            movieThis();
        }

        if (result.options === "do-what-it-says") {
            doThis();
        }

    });

    