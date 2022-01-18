const dbConfig = require("../databases/dbconfig");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions:{
    dateStrings: dbConfig.dialectOptions.dateStrings,
    typeCast: dbConfig.dialectOptions.typeCast,
    timezone: dbConfig.dialectOptions.timezone
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    charset: dbConfig.define.charset,
    collate: dbConfig.define.collate
  },
  timezone: dbConfig.timezone,
  freezeTableName: dbConfig.freezeTableName
});

const db = {};

Object.keys(db).forEach(modelName =>{
  if('associate' in db[modelName]){
    db[modelName].associate(db)
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.product = require("./products")(sequelize, Sequelize);

module.exports = db;