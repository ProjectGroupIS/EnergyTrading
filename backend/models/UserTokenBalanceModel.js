// models/UserTokenBalance.js
module.exports = (sequelize, DataTypes) => {
  const UserTokenBalance = sequelize.define('UserTokenBalance', {
    user_id: { type: DataTypes.STRING(36), primaryKey: true },
    token_balance: DataTypes.DECIMAL(18, 8),
    last_updated: DataTypes.DATE
  }, { tableName: 'UserTokenBalance', timestamps: false });

  UserTokenBalance.associate = (models) => {
    UserTokenBalance.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return UserTokenBalance;
};
