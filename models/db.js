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

db.category = require("./categorys")(sequelize, Sequelize);
db.customer = require("./customers")(sequelize, Sequelize);
db.gender = require("./genders")(sequelize, Sequelize);
db.orderitem = require("./orderitem")(sequelize, Sequelize);
db.order = require("./orders")(sequelize, Sequelize);
db.payment = require("./payments")(sequelize, Sequelize);
db.product = require("./products")(sequelize, Sequelize);
db.size = require("./sizes")(sequelize, Sequelize);

//relation
//Product
db.product.belongsTo(db.category, {
  as: 'CATEGORY',
  foreignKey : {
    name : 'CATE_ID',
    allowNull: false
  }
});

db.product.belongsTo(db.gender, {
  as: 'GENDER',
  foreignKey : {
    name : 'GEN_ID',
    allowNull: false
  }
});

db.product.belongsTo(db.size, {
  as: 'SIZE',
  foreignKey : {
    name : 'SIZE_ID',
    allowNull: false
  }
});

db.product.hasMany(db.orderitem, {
  foreignKey : {
    name : 'PROD_ID',
    allowNull: false
  }
});

//customer

db.customer.belongsTo(db.gender, {
  as: 'GENDER',
  foreignKey : {
    name : 'GEN_ID',
    allowNull: false
  }
});

db.customer.hasMany(db.order, {
  foreignKey : {
    name : 'CUS_ID',
    allowNull: false
  }
});

// order

db.order.belongsTo(db.payment, {
  as: 'PAYMENT',
  foreignKey : {
    name : 'PAY_ID',
    allowNull: true
  }
});

db.order.hasMany(db.orderitem, {
  foreignKey : {
    name : 'ORD_ID',
    allowNull: false
  }
});

module.exports = db;