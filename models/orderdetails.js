module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('Orders', {
    ORDD_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    Prod_qty: {
      type: Sequelize.INTEGER,
      allowNull: false
    }

  });

  return Order;
};