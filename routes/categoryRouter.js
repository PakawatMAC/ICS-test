const express = require("express");
const router = express.Router();
const categoryController = require('../controller/categoryController');

// Create a new category
router.post("/create", categoryController.addCategory);

// Retrieve all categorys
router.get("/", categoryController.findAllCategorys);

// Retrieve search categorys
router.get("/search/:id", categoryController.findCategorysByKeyword);

// Update a category with id
router.put("/update/:id", categoryController.updateCategory);

// Delete a category with id
router.delete("/delete/:id", categoryController.deleteCategory);



module.exports = router;