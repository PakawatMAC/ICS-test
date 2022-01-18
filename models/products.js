module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('Products', {
    PROD_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    PROD_CATEGORY: {
      type: Sequelize.ENUM('Plain Color', 'Pattern', 'Figure'),
      allowNull: false
    },
    PROD_GENDER: {
      type: Sequelize.ENUM('Male', 'Female'),
      allowNull: false
    },
    PROD_SIZE: {
      type: Sequelize.ENUM('XS', 'S', 'M' ,'L', 'XL'),
      allowNull: false
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