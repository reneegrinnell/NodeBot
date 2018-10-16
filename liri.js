require("dotenv").config();
var keys = require("keys");
var Spotify = require("node-spotify-api");

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

if (process.argv[2] == "concert-this") {

    var artist = process.argv.slice(3).join(" ")
    console.log(artist);

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryURL, function (error, response, body) {
        if (error) console.log(error);
        var result = JSON.parse(body)[0];
        console.log("Venue name " + result.venue.name);
        console.log("Venue location " + result.venue.city);
        //Event date, using moment.js to format
        console.log("Date of Event " + moment(result.datetime).format("MM/DD/YYYY"));
    });
}

else if (process.argv[2] == "spotify-this-song") {

    var songName = process.argv.slice(3).join(" ");

    if (songName == undefined) {
        songName = "Dancing+Queen+Abba";
    }

    spotify.search({ type: "track", query: songName, limit: 10 }, function (err, data) {
        if (err) {
            return console.log("O noes, an error: " + err);
        }

        var spotifyArray = [];

        for (var i = 0; i < data.tracks.items.length; i++) {
            var result = {
                artist: data.tracks.items[i].album.artists[0].name,
                album_name: data.tracks.items[i].album.name,
                song_name: data.tracks.items[i].name,
                preview_url: data.tracks.items[i].preview_url
            }
            spotifyArray.push(result);
        }

        console.log(tableArray);

    });

}
else if (process.argv[2] == "movie-this") {
    var movieName = process.argv.slice(3).join(" ");

    if (movieName == undefined) {
        movieName = "Mr+Bean";
    }

    request('http://www.omdbapi.com/?i=tt3896198&apikey=trilogy&t=' + process.argv[3], function (error, response, body) {

        var result = JSON.parse(body);
        console.log("Title :" + result.Title);
        console.log("Year :" + result.Released);
        console.log("IMDB Rating :" + result.imdbRating);
        console.log("Rotten Tomatoes :" + result.Ratings[1].Value);
        console.log("Country :" + result.Country);
        console.log("Language :" + result.Language);
        console.log("Movie Plot :" + result.Plot);
        console.log("Actors :" + result.Actors);

    });

} else if (process.argv[2] == "do-what-it-says") {
    console.log("Do what it says!")
}