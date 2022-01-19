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
var categoryRouter = require('./routes/categoryRouter');
app.use('/category', categoryRouter);

var sizeRouter = require('./routes/sizeRouter');
app.use('/size', sizeRouter);

var genderRouter = require('./routes/genderRouter');
app.use('/gender', genderRouter);

var productRouter = require('./routes/productRouter');
app.use('/product', productRouter);

var customerRouter = require('./routes/customerRouter');
app.use('/customer', customerRouter);

var reportRouter = require('./routes/reportRouter');
app.use('/report', reportRouter);

var orderRouter = require('./routes/orderRouter');
app.use('/order', orderRouter);