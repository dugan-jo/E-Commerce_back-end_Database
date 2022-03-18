// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Product.hasOne(Category, { //this might be revered
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});


Category.hasMany(Product, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  allowNull: true,
});

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  allowNull: true,
});

Tag.belongsToMany(Product, {
  foreignKey: 'product_id',
  allowNull: true,
});

// Categories have many Products

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
