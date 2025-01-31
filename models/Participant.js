const { DataTypes } = require('sequilize');
const sequilize = require('../database');

const Participant = sequilize.define('Participant', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Participant;