module.exports = (sequelize, Sequelize) => {
  const Orderitem = sequelize.define('Orderitems', {
    ORDIT_ID: {
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

  return Orderitem;
};