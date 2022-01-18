module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define('Payments', {
    PAY_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    PAY_STATUS: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    PAY_AMOUNT: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    PAY_EVID: {
      type: Sequelize.STRING(255),
      allowNull: true
    },

  });

  return Payment;
};