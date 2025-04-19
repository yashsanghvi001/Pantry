const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const RewardCard = sequelize.define('RewardCard', {
  card_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'user_id'
    }
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  color: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  barcode_image_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Reward_Cards',
  timestamps: false
});

// Define association
RewardCard.belongsTo(User, { foreignKey: 'user_id' });

module.exports = RewardCard; 