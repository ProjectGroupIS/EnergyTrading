// models/AuditLog.js
module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define('AuditLog', {
    audit_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    regulator_id: DataTypes.STRING(36),
    transaction_id: DataTypes.STRING(64),
    audit_notes: DataTypes.TEXT,
    audit_timestamp: DataTypes.DATE
  }, { tableName: 'AuditLog', timestamps: false });

  AuditLog.associate = (models) => {
    AuditLog.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
  };

  return AuditLog;
};
