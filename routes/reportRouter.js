const express = require("express");
const router = express.Router();
const reportController = require('../controller/reportController');


// Retrieve all customers
router.get("/", reportController.findAllCustomers);

// Retrieve search customers
router.get("/search/:id", reportController.findCustomersByKeyword);


module.exports = router;