const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getAthletics,
  getEyewears,
  getCollections,
} = require("../controllers/productC");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

router.route("/").get(getAllProducts);
router.route("/athletics").get(getAthletics);
router.route("/collections").get(getCollections);
router.route("/eyewears").get(getEyewears);

router.route("/").post(verifyAdmin, createProduct);

router
  .route("/:id")
  .put(verifyAdmin, updateProduct)
  .delete(verifyAdmin, deleteProduct)
  .get(getSingleProduct);

module.exports = router;
