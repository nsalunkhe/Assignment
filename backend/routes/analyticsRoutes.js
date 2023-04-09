const express = require("express");
const { getAllUsers } = require("../controllers/userController");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/top-active");

module.exports = router;
