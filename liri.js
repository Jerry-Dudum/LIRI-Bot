require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var fs = require("fs");


