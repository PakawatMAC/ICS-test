module.exports = (sequelize, Sequelize) => {
  const Orderdetail = sequelize.define('Orderdetails', {
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

  return Orderdetail;
};