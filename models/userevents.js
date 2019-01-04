"use strict";
//var Users = require("./user");
// Creating the userevents model
module.exports = function (sequelize, DataTypes) {
  var UserEvents = sequelize.define("UserEvents", {
    // userId: {
    //   type: DataTypes.STRING
    // },
    // eventId: {
    //   type: DataTypes.STRING
    // }
  });
  //UserEvents.belongsTo(Users);
  // UserEvents.belongsTo(User, {foreignKey: 'Id'});
  UserEvents.associate = function(models) {
    UserEvents.hasMany(models.Users);
  };

  UserEvents.associate = function(models) {
    UserEvents.hasMany(models.Events);
  };
  return UserEvents;
};