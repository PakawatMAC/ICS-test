module.exports = (sequelize, Sequelize) => {
  const Gender = sequelize.define('Genders', {

    GEN_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    GEN_NAME: {
      type: Sequelize.STRING(255),
      allowNull: false
    }

  });

  return Gender;
};