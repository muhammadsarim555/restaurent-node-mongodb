const mongoose = require("mongoose");

const { Schema, SchemaTypes, model } = mongoose;

const checkoutSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  products: [{
    type: SchemaTypes.ObjectId,
    ref: "Product",
    required: true,
  }],
  paymentType: {
    type: String,
    default: "COD",
  },
  price: {
    type: Number,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
  },
  netAmount: { type: Number, required: true },
});

const Checkout = model("CheckoutSchema", checkoutSchema);

module.exports = Checkout;
