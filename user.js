const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [20, 60] }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(400),
    allowNull: false,
    validate: { len: [1, 400] }
  },
  role: {
    type: DataTypes.ENUM('admin', 'user', 'owner'),
    defaultValue: 'user'
  }
});

module.exports = User;