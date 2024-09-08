const Product = require("../models/product");

exports.getProductFromCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  const pro = await Product.find({
    category: categoryId,
  }).populate("category");

  res.send(pro);
};

exports.getFeatureProducts = async (req, res) => {
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
};

exports.createProduct = async (req, res) => {
  const isExistProduct = await Product.findOne({ name: req.body.name });

  if (isExistProduct?._id) {
    res.send({ message: "This Product is already exist", status: 403 });
    return;
  }

  const proObj = new Product(req.body);

  await proObj.save();

  res.send(proObj);
};
