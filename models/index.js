const User = require('./User');
const Category = require('./Category');
const Store = require('./Store');
const Product = require('./Product');
const ProductPrice = require('./ProductPrice');
const List = require('./List');
const ListMember = require('./ListMember');
const ListItem = require('./ListItem');
const Recipe = require('./Recipe');
const RecipeItem = require('./RecipeItem');
const Coupon = require('./Coupon');
const Ad = require('./Ad');
const Deal = require('./Deal');
const RewardCard = require('./RewardCard');
const EmailVerificationToken = require('./EmailVerificationToken');

// User associations
User.hasMany(List, { foreignKey: 'created_by', as: 'createdLists' });
User.hasMany(Recipe, { foreignKey: 'user_id', as: 'recipes' });
User.hasMany(Coupon, { foreignKey: 'submitted_by', as: 'submittedCoupons' });
User.hasMany(RewardCard, { foreignKey: 'user_id', as: 'rewardCards' });
User.hasMany(EmailVerificationToken, { foreignKey: 'user_id', as: 'verificationTokens' });

// Category associations
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });

// Store associations
Store.hasMany(ProductPrice, { foreignKey: 'store_id', as: 'productPrices' });
Store.hasMany(Coupon, { foreignKey: 'store_id', as: 'coupons' });

// Product associations
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Product.hasMany(ProductPrice, { foreignKey: 'product_id', as: 'prices' });
Product.hasMany(ListItem, { foreignKey: 'product_id', as: 'listItems' });
Product.hasMany(RecipeItem, { foreignKey: 'product_id', as: 'recipeItems' });
Product.hasMany(Deal, { foreignKey: 'product_id', as: 'deals' });

// List associations
List.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
List.belongsToMany(User, { through: ListMember, foreignKey: 'list_id', as: 'members' });
List.hasMany(ListItem, { foreignKey: 'list_id', as: 'items' });

// Recipe associations
Recipe.belongsTo(User, { foreignKey: 'user_id', as: 'creator' });
Recipe.hasMany(RecipeItem, { foreignKey: 'recipe_id', as: 'items' });

module.exports = {
  User,
  Category,
  Store,
  Product,
  ProductPrice,
  List,
  ListMember,
  ListItem,
  Recipe,
  RecipeItem,
  Coupon,
  Ad,
  Deal,
  RewardCard,
  EmailVerificationToken
}; 