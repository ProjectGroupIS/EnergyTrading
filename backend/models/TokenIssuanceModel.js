// models/TokenIssuance.js
module.exports = (sequelize, DataTypes) => {
  const TokenIssuance = sequelize.define('TokenIssuance', {
    issuance_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    producer_id: DataTypes.STRING(36),
    energy_id: DataTypes.INTEGER,
    token_amount: DataTypes.DECIMAL(18, 8),
    issued_by: DataTypes.STRING(36),
    timestamp: DataTypes.DATE,
    blockchain_tx_hash: DataTypes.STRING(100)
  }, { tableName: 'TokenIssuance', timestamps: false });

  TokenIssuance.associate = (models) => {
    TokenIssuance.belongsTo(models.EnergyData, { foreignKey: 'energy_id' });
  };

  return TokenIssuance;
};
