const Category = require("../models/category");

exports.createCategory = async (req, res) => {
  const isExistCat = await Category.findOne({ name: req.body.name });

  if (isExistCat?._id) {
    res.send({ message: "This category name already exist", status: 403 });
    return;
  }

  const catObj = new Category(req.body);

  await catObj.save();

  res.send(catObj);
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find();

  res.send(categories);
};
