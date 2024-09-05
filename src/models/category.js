const mongoose = require("mongoose");

const { Schema, SchemaTypes, model } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Category = model("Category", categorySchema);

module.exports = Category;
