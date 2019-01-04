"use strict";
// Creating the Buddies model
module.exports = function (sequelize, DataTypes) {
    var Buddies = sequelize.define("Buddies", {
        user_event_id: {
            type: DataTypes.STRING
        }
    });
    
    Buddies.associate = function (models) {
        Buddies.hasMany(models.Events);
    };

    //creates the UserID foreign key
    Buddies.associate = function (models) {
        Buddies.belongsTo(models.User);
    };

    
    return Buddies;
};
