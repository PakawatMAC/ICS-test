module.exports = (sequelize, Sequelize) => {
  const Size = sequelize.define('Sizes', {

    SIZE_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    SIZE_NAME: {
      type: Sequelize.STRING(50),
      allowNull: false
    }

  });

  return Size;
};