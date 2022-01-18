const express = require('express');
var cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const db = require("./models/db");
db.sequelize.sync();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
app.use(session({
  secret: 'secret',
  resave: 'true',
  saveUninitialized: 'true'
}));

//route
var productRouter = require('./routes/productRouter');
app.use('/product', productRouter);