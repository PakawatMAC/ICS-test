const express = require("express");
const router = express.Router();
const sizeController = require('../controller/sizeController');

// Create a new size
router.post("/create", sizeController.addSize);

// Retrieve all sizes
router.get("/", sizeController.findAllSizes);

// Retrieve search sizes
router.get("/search/:id", sizeController.findSizesByKeyword);

// Update a size with id
router.put("/update/:id", sizeController.updateSize);

// Delete a size with id
router.delete("/delete/:id", sizeController.deleteSize);



module.exports = router;