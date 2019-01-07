"use strict";
// Creating the events model
module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("Events", {
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    venue: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING
    },
    time: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Latitude: {
      type: DataTypes.DECIMAL(10, 4)
    },
    Longitude: {
      type: DataTypes.DECIMAL(10, 4)
    }
  });

  Events.associate = function(models) {
    Events.belongsTo("UserXEvents");
  };

  Events.associate = function(models) {
    Events.hasMany(models.Buddies);
  };

  //creates the UserID foreign key
  Events.associate = function (models) {
    Events.belongsTo(models.User);
};

  //many to many between users and events
  Events.associate = function(models) {
    Events.belongsToMany(models.User, { through: models.UserEvents });
  };
  return Events;
};
