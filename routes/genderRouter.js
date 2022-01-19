const express = require("express");
const router = express.Router();
const genderController = require('../controller/genderController');

// Create a new gender
router.post("/create", genderController.addGender);

// Retrieve all genders
router.get("/", genderController.findAllGenders);

// Retrieve search genders
router.get("/search/:id", genderController.findGendersByKeyword);

// Update a gender with id
router.put("/update/:id", genderController.updateGender);

// Delete a gender with id
router.delete("/delete/:id", genderController.deleteGender);



module.exports = router;