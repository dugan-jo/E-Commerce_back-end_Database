const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    product_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: "Product",
        key: "id"
      }
    }
  },
  {
    tag_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: "tag",
        key: "id"
      }
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

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
