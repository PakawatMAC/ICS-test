module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('Products', {

    PROD_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    PROD_PRICE: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    PROD_QUANTITY: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
    
  });

  return Product;
};