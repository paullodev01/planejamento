const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Event = sequilize.define('Event', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },

});

module.exports = Event;