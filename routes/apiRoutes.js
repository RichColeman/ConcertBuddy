var db = require("../models");
let request = require("request");

//IB Requiring passport
var passport = require("../config/passport");

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
//IB models and passport for authentication
module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/members");
  });

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

  // Route for log out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    }
    else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

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