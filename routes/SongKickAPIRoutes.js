require("dotenv").config();

let keys = require("../keys");

let request = require("request");
let kick = keys.secrets.song
let map = keys.secrets.map
//adding a generic comment
module.exports = function(app) {
  app.get("/api/songkick/artist/:artist", function(req, res) {
    let concertArray = [];
    let URL = `https://api.songkick.com/api/3.0/search/artists.json?apikey=${kick}&query=${
      req.params.artist
    }`;
    request(URL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let jsonData = JSON.parse(body);
        let artistID = jsonData.resultsPage.results.artist[0].id;
        let URL2 = `https://api.songkick.com/api/3.0/artists/${artistID}/calendar.json?apikey=${kick}`;
        request(URL2, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            let jsonData2 = JSON.parse(body);
            if (jsonData2.resultsPage.totalEntries == 0) {
              return
            } else {
              for (let i = 0; i < 15; i++) {
                let concertData = {
                  artist:
                    jsonData2.resultsPage.results.event[i].performance[0]
                      .displayName,
                  venue:
                    jsonData2.resultsPage.results.event[i].venue.displayName,
                  Date: jsonData2.resultsPage.results.event[i].start.date,
                  City:
                    jsonData2.resultsPage.results.event[i].venue.metroArea
                      .displayName,
                  Time:
                    jsonData2.resultsPage.results.event[i].start.time,
                  Latitude:
                    jsonData2.resultsPage.results.event[i].venue.lat,
                  Longitude:
                    jsonData2.resultsPage.results.event[i].venue.lng
                };
                concertArray.push(concertData);
              }
              res.json(concertArray);
            }
          }
        });
      } 
    });
  });
  app.get("/api/songkick/city/:zip", (req, res) => {
    let concertArray = [];
    let URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${
      req.params.zip
    }&key=${map}`;
    request(URL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let googleMaps = JSON.parse(body);
        let lat = +googleMaps.results[0].geometry.location.lat;
        let lng = +googleMaps.results[0].geometry.location.lng;
        let URL2 = `https://api.songkick.com/api/3.0/search/locations.json?location=geo:${lat},${lng}&apikey=${kick}`;
        request(URL2, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            let geoLocation = JSON.parse(body);
            let metroID =
              geoLocation.resultsPage.results.location[0].metroArea.id;
            let URL3 = `https://api.songkick.com/api/3.0/metro_areas/${metroID}/calendar.json?apikey=${kick}`;
            request(URL3, (error, response, body) => {
              if (!error && response.statusCode === 200) {
                let concertResponse = JSON.parse(body);
                if (concertResponse.resultsPage.totalEntries == 0) {
                  return
                } else {
                  for (let i = 0; i < 15; i++) {
                    let concertData = {
                      artist:
                        concertResponse.resultsPage.results.event[i].performance[0]
                          .displayName,
                      venue:
                        concertResponse.resultsPage.results.event[i].venue.displayName,
                      Date: concertResponse.resultsPage.results.event[i].start.date,
                      City:
                        concertResponse.resultsPage.results.event[i].venue.metroArea
                          .displayName,
                      Time:
                        concertResponse.resultsPage.results.event[i].start.time,
                      Latitude:
                        concertResponse.resultsPage.results.event[i].venue.lat,
                      Longitude:
                        concertResponse.resultsPage.results.event[i].venue.lng
                    };
                    concertArray.push(concertData);
                  }
                  res.json(concertArray);
                }
              }
            });
          } 
        });
      }
    });
  });
};
