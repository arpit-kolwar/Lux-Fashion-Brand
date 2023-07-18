const express = require("express");
const router = express.Router();
const {
  getAllUser,
  updateUser,
  deleteUser,
  getSingleUser,
} = require("../controllers/userC");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

router.route("/").get(verifyAdmin, getAllUser);
router.route("/:id").put(verifyUser, updateUser);

router.route("/:id").delete(verifyUser, deleteUser);
router.route("/:id").delete(verifyUser, verifyAdmin, deleteUser);
router.route("/:id").get(verifyAdmin, getSingleUser);

module.exports = router;
