// backend/models/index.js
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("renewable_energy_db", "root", "sqlpro1", {
  host: "localhost",
  dialect: "mysql"
});

// Example model to test connection
const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.STRING(36),
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.ENUM("producer", "consumer", "regulator"),
    allowNull: false
  }
});

module.exports = { sequelize, User };
