require('dotenv').config();

const dbconfig = {
  HOST: process.env.DB_HOST,
  USER     : process.env.DB_USER,
  PASSWORD : process.env.DB_PASSWORD,
  DB : process.env.DB_NAME,
  timezone: process.env.TZ,
  dialect: "mysql",
  dialectOptions:{
    dateStrings: true,
    typeCast: true,
    timezone: process.env.TZ
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
  freezeTableName: true
}

module.exports = dbconfig;