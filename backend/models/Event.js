module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    description: { 
      type: DataTypes.TEXT,
      allowNull: false 
    },
    date: { 
      type: DataTypes.DATE,
      allowNull: false 
    },
    location: { 
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  return Event;
};
