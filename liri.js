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
var date = "";

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
                console.log("You didn't type out an artitst so I'll just choose Post Malone for you.")
                artist = "Post Malone"
            }
            else {
                artist = result.concert;
            }

            axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response){
                // console.log(response.data);

                if (response.data.length === 0) {
                    console.log("Sorry no upcoming events for this artist :(")
                }
                else {
                    console.log("Venue: " + response.data[0].venue.name);
                    console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);

                    date = moment(response.data[0].datetime).format('MM DD YYYY')
                    console.log("Date: " + date);
                }


            })
        })
}
