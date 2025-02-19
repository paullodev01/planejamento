module.exports = (sequelize, DataTypes) => {
    const Registration = sequelize.define("Registration", {});
  
    // definindo os relacionamentos entre eventos e participantes
    const Event = require("./Event")(sequelize, DataTypes);
    const Participant = require("./Participant")(sequelize, DataTypes);
  
    Event.belongsToMany(Participant, { through: Registration });
    Participant.belongsToMany(Event, { through: Registration });
  
    return Registration;
  };
