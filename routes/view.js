const express = require("express");
const router = express.Router();
const viewController = require("../controllers/view");

// This route is for saving visit counts into the database
router.post("/", viewController.saveViewCounts);

module.exports = router;
