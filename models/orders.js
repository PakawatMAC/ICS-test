module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('Orders', {
    ORD_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    ORD_TOTAL: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    ORD_STATUS: {
      type: Sequelize.STRING(255),
      allowNull: false
    },

  });

  return Order;
};