var db = require("../models");
// IB - Requiring path
var path = require("path");
// IB Requiring middleware for checking if a user is logged in
var isAuthenticated = require("../config/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(exampledb) {
      res.render("index", {
        msg: "Welcome!",
        examples: exampledb
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: exampledb
      });
    });
  });
  //ib add
  app.get("/login", function(req, res) {
    // has an account send to members page
    if (req.user) {
      // res.redirect("/members");
      res.sendFile(path.join(__dirname, "../public/members.html"));
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // adding isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
