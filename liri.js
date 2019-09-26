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

            axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {
                // console.log(response.data); used to parse out the data needed

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
};

var song = "";

function spotifyThisSong() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please select a song to search up on Spotify.",
                name: "song"
            }
        ])
        .then(function (result) {
            if (result.song === "") {
                console.log("You didn't type out a song so I'll just choose SLOW DANCING IN THE DARK for you.")
                song = "SLOW DANCING IN THE DARK"
            }
            else {
                song = result.song;
            }

            spotify.search({ type: 'track', query: song }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                // console.log(data.tracks.items[0]); what i used to parse out data below

                console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
                console.log("Song Name: " + data.tracks.items[0].name);
                console.log("Album: " + data.tracks.items[0].album.name);
                if (data.tracks.items[0].preview_url) {
                    console.log("Preview Link: " + data.tracks.items[0].preview_url);
                }
                
            })
        })
};

var movie = "";

function movieThis() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please select a movie to search up.",
                name: "movie"
            }
        ])
        .then(function (result) {
            if (result.movie === "") {
                console.log("You didn't type out a movie so I'll choose Eternal Sunshine of the Spotless Mind for you.");
                movie = "Eternal Sunshine of the Spotless Mind";
            }
            else {
                movie = result.movie;
            }
            axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
                function (response) {
                    // console.log(response.data); used to look up values and parse data

                    console.log("Title: " + response.data.Title);
                    console.log("Released: " + response.data.Released);
                    console.log("IMDB Rating: " + response.data.imdbRating);
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                    console.log("Country Produced: " + response.data.Country);
                    console.log("Language of Movie: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log("---------------Data---------------");
                        console.log(error.response.data);
                        console.log("---------------Status---------------");
                        console.log(error.response.status);
                        console.log("---------------Status---------------");
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log("Error", error.message);
                    }
                    console.log(error.config);
                });
        })
};

var option = "";

function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        option = dataArr[0];
        random = dataArr[1];

        switch (option) {
            case "concert-this":
                axios.get("https://rest.bandsintown.com/artists/" + random + "/events?app_id=codingbootcamp").then(function (response) {
                    

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
                break;

            case "spotify-this-song":
                spotify.search({ type: 'track', query: random }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }

                    console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
                    console.log("Song Name: " + data.tracks.items[0].name);
                    console.log("Album: " + data.tracks.items[0].album.name);
                    if (data.tracks.items[0].preview_url) {
                        console.log("Preview Link: " + data.tracks.items[0].preview_url);
                    }

                })
                break;
            
            case "movie-this":
                axios.get("http://www.omdbapi.com/?t=" + random + "&y=&plot=short&apikey=trilogy").then(
                    function (response) {
                        

                        console.log("Title: " + response.data.Title);
                        console.log("Released: " + response.data.Released);
                        console.log("IMDB Rating: " + response.data.imdbRating);
                        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                        console.log("Country Produced: " + response.data.Country);
                        console.log("Language of Movie: " + response.data.Language);
                        console.log("Plot: " + response.data.Plot);
                        console.log("Actors: " + response.data.Actors);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            console.log("---------------Data---------------");
                            console.log(error.response.data);
                            console.log("---------------Status---------------");
                            console.log(error.response.status);
                            console.log("---------------Status---------------");
                            console.log(error.response.headers);
                        } else if (error.request) {
                            console.log(error.request);
                        } else {
                            console.log("Error", error.message);
                        }
                        console.log(error.config);
                    });
                break;
        }
    });
}
