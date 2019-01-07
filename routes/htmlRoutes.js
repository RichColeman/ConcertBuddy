var db = require("../models");
// IB - Requiring path
var path = require("path");
// IB Requiring middleware for checking if a user is logged in
var isAuthenticated = require("../config/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // db.Example.findAll({}).then(function(exampledb) {
      res.render("index", {
        // msg: "Welcome!"
    //     examples: exampledb
      });
    // });
  });

  // this is junk and should be deleted assuming nothing breaks
  // app.get("/example/:id", function (req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.render("example", {
  //       example: exampledb
  //     });
  //   });
  // });
  //ib add
  app.get("/login", function(req, res) {
    // has an account send to myevents
    if (req.user) {
      // res.redirect("/members");
      res.sendFile(path.join(__dirname, "../public/myevents.html"));
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
    // has an account send to myevents page
    if (req.user) {
      // res.redirect("/members");
      res.sendFile(path.join(__dirname, "../public/myevents.html"));
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // adding isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the login page
  // if user is authenticated, user will be routed to the event.html page
  app.get("/events", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/event.html"));
  });

  // adding isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the login page
  app.get("/myevents", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/myevents.html"));
  });

  //route user to home page for any unmatched routes
  // app.get("*", function(req, res) {
  //   //index pahe is a handlebar.  only handlebar we are using
  //   res.render("index");
  //   // res.render("404");
  // });
};
