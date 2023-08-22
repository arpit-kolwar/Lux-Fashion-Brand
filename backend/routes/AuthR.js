const express = require("express");
const { createUser, userLogin } = require("../controllers/authC");

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(userLogin);

module.exports = router;
