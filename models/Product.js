
const { Model, DataTypes } = require("sequelize");

const sequelize = require('../config/connection');
const Category = require("./Category");
class Product extends Model {}
// 
// 
// 
/////////////////////////////////////////////////////
//                                                 //
//    set up fields and rules for Product model    //
//                                                 //
/////////////////////////////////////////////////////
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: { 
        isDecimal: true 
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: { 
        isNumeric: true
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: { 
        model: Category, 
        key: "id" },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);

module.exports = Product;
