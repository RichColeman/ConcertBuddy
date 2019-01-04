var db = require("../models");
let request = require("request");

//IB Requiring passport
var passport = require("../config/passport");

//IB models and passport for authentication
module.exports = function(app) {
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the index page.
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    
    res.json("/");
  });

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      zipcode: req.body.zipcode,
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

  // Route for profile, redirect to login if not logged on
  app.get("/profile", function(req, res) {
    res.redirect("/api/login");
  });

  app.get("/api/user_data", function(req, res) {
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
