const express = require("express");
const router = express.Router();
const customerController = require('../controller/customerController');

// Create a new customer
router.post("/create", customerController.addCustomer);

// Retrieve all customers
router.get("/", customerController.findAllCustomers);

// Retrieve search customers
router.get("/search/:id", customerController.findCustomersByKeyword);

// Update a customer with id
router.put("/update/:id", customerController.updateCustomer);

// Delete a customer with id
router.delete("/delete/:id", customerController.deleteCustomer);



module.exports = router;