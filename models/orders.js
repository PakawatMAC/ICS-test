module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('Orders', {
    ORD_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    ORD_total: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    PAY_STATUS: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },

  });

  return Order;
};