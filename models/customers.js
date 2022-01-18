module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('Customers', {
    CUS_ID: {
      type: Sequelize.STRING(255),
      primaryKey: true,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a email address",
        }
      }
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