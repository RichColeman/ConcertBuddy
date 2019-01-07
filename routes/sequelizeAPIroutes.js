let db = require("../models");

module.exports = (app) => {
    app.post("/api/events", (req, res) => {
        console.log("good");
        console.log(req.body);
        console.log(req.body.Longitude);
        console.log(req.body.Latitude);
        db.Events.create({
            artist: req.body.artist,
            venue: req.body.venue,
            date: req.body.Date,
            time: req.body.Time,
            city: req.body.City,
            Latitude: req.body.Latitude,
            Longitude: req.body.Longitude
        }).then(function(dbPost){
            res.json(dbPost);
        })
    })
}