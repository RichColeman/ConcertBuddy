var db = require("../models");
//let request = require("request");

//IB Requiring passport
var passport = require("../config/passport");

//IB models and passport for authentication
module.exports = function(app) {
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the index page.
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    //res.redirect("/home");
    res.json("/home");
  });
//after a user signs up, call the api/login route above to ensure authentication.  
//the login route will then take them to the home page
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      zipcode: req.body.zipcode,
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login"); //this calls the login post above, which routes a signed in user to home.html
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

  // Route for log out.  This will log them out and take them to the home page
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for myevents, redirect to login if not logged on
  app.get("/myevents", function(req, res) {
    res.redirect("/api/login");
  });

  // Route for event page when user clicks "I'm going".  redirect to login if not logged on
  app.get("/event", function(req, res) {
    res.redirect("/api/login");
  });

  //ib - below is being used to check who is logged on
  app.get("/api/user_data", function(req, res) {
    //if not loged in, send back empty object
    if (!req.user) {
      res.json({});
    }
    else {
      res.json({
        email: req.user.email,
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        zipcode: req.user.zipcode
      });
    }
  });

};
