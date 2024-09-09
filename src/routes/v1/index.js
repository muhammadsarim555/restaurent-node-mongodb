const express = require("express");

const { signUp, login } = require("../../controllers/userController");
const {
  createCategory,
  getCategories,
} = require("../../controllers/categoryController");

const {
  getProductFromCategory,
  getFeatureProducts,
  createProduct,
} = require("../../controllers/productController");

const middleware = require("../../middleware/auth");

const router = express.Router();

router.post("/user/signup", signUp);
router.post("/user/login", login);
router.post("/create-category", createCategory);
router.get("/get-all-categories", middleware, getCategories);
router.post("/create-product", createProduct);
router.get("/get-product-from-category/:categoryId", getProductFromCategory);
router.get("/get-feature-product", getFeatureProducts);

module.exports = router;
