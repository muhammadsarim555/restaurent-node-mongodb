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
const {
  createChekout,
  getCheckoutFromUser,
} = require("../../controllers/checkoutController");

const middleware = require("../../middleware/auth");

const router = express.Router();

router.post("/user/signup", signUp);
router.post("/user/login", login);
router.post("/create-category", createCategory);
router.post("/make-checkout", middleware, createChekout);

router.post("/create-product", createProduct);
router.get("/get-all-categories", middleware, getCategories);
router.get("/get-product-from-category/:categoryId", getProductFromCategory);
router.get("/get-feature-product", getFeatureProducts);
router.get("/get-user-checkout",middleware, getCheckoutFromUser);

module.exports = router;
