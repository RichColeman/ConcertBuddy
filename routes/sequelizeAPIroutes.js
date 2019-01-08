let db = require("../models");

module.exports = app => {
  app.post("/api/events", (req, res) => {
    db.Events.findOne({
      where: {
        artist: req.body.artist,
        date: req.body.Date,
        time: req.body.Time
      }
    }).then(function(events) {
      if (!events) {
        db.Events.create({
          artist: req.body.artist,
          venue: req.body.venue,
          date: req.body.Date,
          time: req.body.Time,
          city: req.body.City,
          Latitude: req.body.Latitude,
          Longitude: req.body.Longitude
        }).then(function(dbPost) {
          db.UserEvents.create({
              userId: req.user.id,
              eventId: dbPost.dataValues.id
            
          }).then(function(events) {
            res.status(200).end();
          });
          res.json(dbPost);
        });
      } else {
        db.UserEvents.findOne({
          where: {
            userId: req.user.id,
            eventId: events.dataValues.id
          }
        }).then(function(hope) {
          if (!hope) {
            db.UserEvents.create({
              userId: req.user.id,
              eventId: events.dataValues.id
            }).then(function(response) {
              console.log(events);
              res.json(events);
            });
          } else {
            console.log("You have already registered for this event");
            res.status(500).end();
          }
        });
      }
    });
  });
};
