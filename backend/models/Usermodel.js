// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: { type: DataTypes.STRING(36), primaryKey: true },
    name: DataTypes.STRING(100),
    email: DataTypes.STRING(100),
    role: DataTypes.ENUM('producer', 'consumer', 'regulator'),
    wallet_address: DataTypes.STRING(100),
    location: DataTypes.STRING(100),
    public_key: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, { tableName: 'User', timestamps: false });

  User.associate = (models) => {
    User.hasMany(models.EnergyData, { foreignKey: 'user_id' });
    User.hasOne(models.UserTokenBalance, { foreignKey: 'user_id' });
    User.hasMany(models.Transaction, { foreignKey: 'from_user_id' });
  };

  return User;
};
