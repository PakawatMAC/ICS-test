module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define('Categorys', {

    CATE_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    CATE_NAME: {
      type: Sequelize.STRING(255),
      allowNull: false
    }

  });

  return Category;
};