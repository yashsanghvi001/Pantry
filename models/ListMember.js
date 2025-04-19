const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const List = require('./List');
const User = require('./User');

const ListMember = sequelize.define('ListMember', {
  list_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Lists',
      key: 'list_id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Users',
      key: 'user_id'
    }
  }
}, {
  tableName: 'List_Members',
  timestamps: false
});

// Define associations
ListMember.belongsTo(List, { foreignKey: 'list_id' });
ListMember.belongsTo(User, { foreignKey: 'user_id' });

module.exports = ListMember; 