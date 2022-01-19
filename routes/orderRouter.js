const express = require("express");
const router = express.Router();
const orderController = require('../controller/orderController');



// Create a new order
router.post("/create", orderController.addOrder);

// Retrieve all orders
router.get("/", orderController.findAllOrders);

// Retrieve search orders
router.get("/search/:id", orderController.findOrdersByKeyword);

// Update a order with id
router.put("/update/:id", orderController.updateOrder);

// Delete a order with id
router.delete("/delete/:id", orderController.deleteOrder);



module.exports = router;