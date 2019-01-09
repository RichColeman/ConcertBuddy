let db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = app => {
  app.get("/api/events/:eventId", (req, res) => {
    let concertid = req.params.eventId;
    db.Events.findOne({
      where: {
        id: concertid
      }
    }).then(function(event) {
      res.json(event);
    });
  });

  app.get("/api/attendees/:eventId", (req, res) => {
    let concertid = req.params.eventId;
    console.log(concertid);
    db.UserEvents.findAll({
      where: {
        eventId: concertid
      }
    }).then(function(event) {
      let users = event.map(userevent => +userevent.dataValues.userId);
      console.log(users);
        db.User.findAll({
          where: {
            id: {
              [Op.in]: users
            }
          }
        }).then(function(people) {
          console.log(people);
          res.json(people);
        })
    });
  });
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






