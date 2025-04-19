const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Store = require('./Store');
const User = require('./User');

const Coupon = sequelize.define('Coupon', {
  coupon_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Stores',
      key: 'store_id'
    }
  },
  submitted_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'user_id'
    }
  },
  status: {
    type: DataTypes.CHAR(1),
    defaultValue: 'P',
    validate: {
      isIn: [['P', 'A', 'R']] // P - pending, A - approved, R - rejected
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Coupons',
  timestamps: false
});

// Define associations
Coupon.belongsTo(Store, { foreignKey: 'store_id' });
Coupon.belongsTo(User, { foreignKey: 'submitted_by', as: 'submitter' });

module.exports = Coupon; 