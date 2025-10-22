// models/Transaction.js
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    transaction_id: { type: DataTypes.STRING(64), primaryKey: true },
    from_user_id: DataTypes.STRING(36),
    to_user_id: DataTypes.STRING(36),
    energy_amount: DataTypes.DECIMAL(10, 2),
    token_amount: DataTypes.DECIMAL(18, 8),
    price_per_kwh: DataTypes.DECIMAL(10, 4),
    timestamp: DataTypes.DATE,
    status: DataTypes.ENUM('pending', 'completed', 'failed'),
    blockchain_tx_hash: DataTypes.STRING(100),
    audit_flag: DataTypes.BOOLEAN
  }, { tableName: 'Transaction', timestamps: false });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { foreignKey: 'from_user_id' });
  };

  return Transaction;
};
