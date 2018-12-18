var db = require("../models");
let request = require("request");

module.exports = function(app) {
  // Get all examples
  app.get("/api/:artist", function(req, res) {
    let array = [];
    let URL =`https://rest.bandsintown.com/artists/${req.params.artist}/events?app_id=codingbootcamp`;
    request(URL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        for (let i = 0; i < 5; i++) {
        jsonData = JSON.parse(body)[i];
      let concertData = {
        Name: jsonData.venue.name,
        City: jsonData.venue.city,
        State: jsonData.venue.region
      }
        console.log(concertData);
        array.push(concertData);
        
    } res.json(array);
  };
    })
})
};


// function concertThis(artist) {
//   let URL =
//     "https://rest.bandsintown.com/artists/" +
//     artist +
//     "/events?app_id=codingbootcamp";
//   request(URL, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       jsonData = JSON.parse(body)[0];
//       let concertData = [
//         "Venue Name: " + jsonData.venue.name,
//         "Venue Location: " + jsonData.venue.city + jsonData.venue.region,
//         "Date of Event " + moment(jsonData.datetime).format("MM/D/YYYY, h:mm:ss A")
//       ].join("\n");
//       console.log(concertData);
//       fs.appendFile("log.txt", concertData, function(err) {
//         if (err) {
//           console.log(err);
//         }
//       });
//     }
//   });
// }