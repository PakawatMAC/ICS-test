const express = require("express")
const router = express.Router()
const productController = require('../controller/productController')

// Create a new product
router.post("/create", productController.addProduct);

// Retrieve all products
router.get("/", productController.findAllProducts);

// Retrieve search products
router.get("/search/:id", productController.findProductsByKeyword);

// Update a product with id
router.put("/update/:id", productController.updateProduct);

// Delete a product with id
router.delete("/delete/:id", productController.deleteProduct);



module.exports = router;