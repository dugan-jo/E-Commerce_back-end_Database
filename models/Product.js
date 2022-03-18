// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    product_name: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      validate: {
        isNumeric: true, 
      }
    }
  },
  {
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      allowNull: true,
      validate: {
        isNumeric: true, 
      },
      reference: {
        model: "category",
        key: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
