// models/EnergyData.js
module.exports = (sequelize, DataTypes) => {
  const EnergyData = sequelize.define('EnergyData', {
    energy_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.STRING(36),
    energy_amount: DataTypes.DECIMAL(10, 2),
    energy_type: DataTypes.STRING(50),
    timestamp: DataTypes.DATE,
    validation_status: DataTypes.ENUM('pending', 'validated', 'rejected'),
    validator_id: DataTypes.STRING(36),
    notes: DataTypes.TEXT
  }, { tableName: 'EnergyData', timestamps: false });

  EnergyData.associate = (models) => {
    EnergyData.belongsTo(models.User, { foreignKey: 'user_id' });
    EnergyData.hasOne(models.TokenIssuance, { foreignKey: 'energy_id' });
  };

  return EnergyData;
};
