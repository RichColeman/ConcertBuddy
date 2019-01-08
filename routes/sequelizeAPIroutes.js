let db = require("../models");

module.exports = (app) => {
    app.post("/api/events", (req, res) => {
        db.Events.findOne({
            where: {
                artist: req.body.artist,
                date: req.body.Date,
                time: req.body.Time
            }
        }).then(function(events) {
        if (!events) {
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
            console.log(dbPost);
            console.log(req.user.id);
            db.UserEvents.findOne({
                where: {
                    userId: req.user.id,
                    eventId: dbPost.dataValues.id
                }
            })
            res.json(dbPost);        
        })
    }
    })
})
}