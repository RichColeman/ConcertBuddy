"use strict";
// Creating the events model
module.exports = function (sequelize, DataTypes) {
    var Events = sequelize.define("Events", {
        // some of these fields may be null cause the api could maybe suck
        artist: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "artist unknown"
        },
        venue: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "venue unknown"
        },
        date: {
            type: DataTypes.STRING,
            allowNull: true
        },
        event_zipcode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        //removing state for now
        // state: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        // },
        time: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Events.associate = function (models) {
        Events.belongsTo("UserXEvents");
    };

    Events.associate = function (models) {
        Events.hasMany(models.Buddies);
    };

    //many to many between users and events
    Events.associate = function(models) {
    
          Events.belongsToMany(models.User, { through: models.UserEvents });
        };
    return Events;
};
