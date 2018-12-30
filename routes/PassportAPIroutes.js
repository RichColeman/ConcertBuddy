var db = require("../models");
let request = require("request");

//IB Requiring passport
var passport = require("../config/passport");

//IB models and passport for authentication
module.exports = function(app) {
  app.post('/api/login',
  passport.authenticate('local', { successRedirect: '/api/profile.html',
                                   failureRedirect: '/api/login',
                                   failureFlash: true }));

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
        id: req.user.id
      });
    }
  });

};
