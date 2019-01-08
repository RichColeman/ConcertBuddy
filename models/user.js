"use strict";
// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // These fields can't be null
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "fakeFirstName"
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "fakeLastName"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
   //one user to many UserEvents
  //  User.associate = function (models) {
  //   User.hasMany(models.UserEvents);
  // };
  // //One user to many Buddies
  // User.associate = function (models) {
  //   User.hasMany(models.Buddies);
  // };
  //many to many between users and events
  //
  // User.associate = function (models) {
  //   User.belongsToMany(models.Events, { through: "UserXEvents" });
  // };

  return User;
};
