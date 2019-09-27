# LIRI-Bot

This program utilizes node and various API's including Bands in Town API, OMDB API, and Spotify API. This allows the user to search upcoming concerts, songs, movies and a random option that outputs a certain search result based on the contents within random.txt. Other packages utilized include axios to get the data from the API's, fs to read the random.txt file, inquirer which initially asks the user what option they want to choose then prompts a seach question based on their selection, moment to format the date of the concert, and lastly dotenv to access a hidden .env file which contains Spotify API requirements. Below is a full and quick demo of the LIRI-Bot in action.

# Demo
![Demo](Liri-bot.gif)

# How to Install and Use LIRI-Bot

1. Access my github and clone down my LIRI-Bot repository to your computer.

2. Once you have made a clone on your computer navigate to it inside your terminal.

3. Install all npm packages by typing in "npm install" and hitting enter. This will install all the dependencies required to run LIRI-Bot.

4. Create a file called .env where you will  be putting your own Spotify API key requirements. Inside the file will look like this:

```
# Spotify API keys

SPOTIFY_ID=YOUR_SPOTIFY_ID
SPOTIFY_SECRET=YOUR_SPOTIFY_SECRET
```

5. Replace "YOUR_SPOTIFY_ID" and "YOUR_SPOTIFY_SECRET" with your own information which can be found here: <https://developer.spotify.com/my-applications/#!/> 

6. Once you have created an account or logged in proceed to this link: <https://developer.spotify.com/my-applications/#!/applications/create> 

7. Once the .env file is complete save the changes and inside the terminal type in
```
node liri.js
```

8. Hit enter and the program will prompt you with 4 options to choose from and from there follow the instructions and have fun looking up bands, songs and movies.

# Technologies Used

- Javascript
- Node
- NPM

# API's

- [Bands in Town](http://www.artists.bandsintown.com/bandsintown-api)
- [Node Spotify](https://www.npmjs.com/package/node-spotify-api)
- [OMDb](http://www.omdbapi.com/)

# NPM Packages

- Axios
- FS
- Inquirer
- Moment
- Dotenv
- FS

### Links
- [LinkedIn](https://www.linkedin.com/in/jsdudum/)