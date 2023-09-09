const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitor');
const auth = require("../auth");

const { verify } = auth;

// This route is for capturing/saving the user input from the form
router.post("/", visitorController.saveVisitorDetails)

// This route is for logging in to check my portfolio dashboard
router.post("/login", visitorController.loginKey);

module.exports = router;