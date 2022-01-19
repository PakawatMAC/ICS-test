module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('Customers', {
    CUS_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    CUS_FNAME: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    CUS_LNAME: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    CUS_ADDRESS: {
      type: Sequelize.STRING(255),
      allowNull: false
    }
  });

  return Customer;
};