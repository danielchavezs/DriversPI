const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      initialValue: 1000,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    forename: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,  
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },
  },
  {
    timestamps: false,
  }
  );
};