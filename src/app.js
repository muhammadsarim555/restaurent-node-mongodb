const express = require("express");

require("./db/mongoose");

const Product = require("./models/product.js");
const Category = require("./models/category.js");

const userRouter = require("./routes/user.Routes.js");

const app = express();

app.use(express.json());
app.use("/api/v1/user", userRouter);

const port = process.env.PORT;

// post routes
app.post("/create-category", async (req, res) => {
  const isExistCat = await Category.findOne({ name: req.body.name });

  if (isExistCat?._id) {
    res.send({ message: "This category name already exist", status: 403 });
    return;
  }

  const catObj = new Category(req.body);

  await catObj.save();

  res.send(catObj);
});

// create product
app.post("/create-product", async (req, res) => {
  const isExistProduct = await Product.findOne({ name: req.body.name });

  if (isExistProduct?._id) {
    res.send({ message: "This Product is already exist", status: 403 });
    return;
  }

  const proObj = new Product(req.body);

  await proObj.save();

  res.send(proObj);
});

// feature product
app.get("/get-feature-product", async (req, res) => {
  const featureProducts = await Product.find({
    featured: true,
  }).populate("category");

  if (!featureProducts.length) {
    res.send({
      message: "No Feature Prduct found Please add first to fetch here",
      status: 404,
    });
  }

  res.send(featureProducts);
});

app.get("/get-product-from-category/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;

  const pro = await Product.find({
    category: categoryId,
  }).populate("category");

  res.send(pro);
});

app.get("/get-all-categories", async (req, res) => {
  const categories = await Category.find();

  res.send(categories);
});

app.listen(port, () => {
  console.log("server listening on port " + port);
});
