'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product_orders.belongsTo(models.orders, {
        foreignKey: 'order_id'
      })

      product_orders.belongsTo(models.products, {
        foreignKey: 'product_id'
      })
    }
  }
  product_orders.init({
    product_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product_orders',
  });
  return product_orders;
};