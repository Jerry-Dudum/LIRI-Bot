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
    .then(function (result) {

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

var artist = "";

function concertThis() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please select an artist to search up concerts for.",
                name: "concert"
            }
        ])
        .then(function (result) {
            if (result.concert === "") {
                console.log("Please type in an artist this time.");
                concertThis();
            }
            else {
                artist = result.concert;
            }

            axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response){
                console.log(response);
            })
        })
}
