// models/LedgerUpdate.js
module.exports = (sequelize, DataTypes) => {
  const LedgerUpdate = sequelize.define('LedgerUpdate', {
    update_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    regulator_id: DataTypes.STRING(36),
    transaction_id: DataTypes.STRING(64),
    update_type: DataTypes.STRING(50),
    notes: DataTypes.TEXT,
    timestamp: DataTypes.DATE
  }, { tableName: 'LedgerUpdate', timestamps: false });

  LedgerUpdate.associate = (models) => {
    LedgerUpdate.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
  };

  return LedgerUpdate;
};
