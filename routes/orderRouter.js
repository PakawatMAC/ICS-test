const express = require("express");
const router = express.Router();
const orderController = require('../controller/orderController');
const paymentController = require('../controller/paymentController');
const orderdetailController = require('../controller/orderdetailController')

// Create a new order
router.post("/create", orderController.addOrder);

// Retrieve all customers
router.get("/", customerController.findAllCustomers);

// Retrieve search customers
router.get("/search/:id", customerController.findCustomersByKeyword);

// Update a customer with id
router.put("/update/:id", customerController.updateCustomer);

// Delete a customer with id
router.delete("/delete/:id", customerController.deleteCustomer);



module.exports = router;