const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitor');

// This route is for capturing/saving the user input from the form
router.post("/", visitorController.saveVisitorDetails)

module.exports = router;