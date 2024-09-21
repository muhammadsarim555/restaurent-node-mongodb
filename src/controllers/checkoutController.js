const Checkout = require("../models/checkout");

const ObjectId = require("mongoose").Types.ObjectId;

exports.createChekout = async (req, res) => {
  const checkoutObj = new Checkout(req.body);

  await checkoutObj.save();

  res.send(checkoutObj);
};

exports.getCheckoutFromUser = async (req, res) => {
  const userCheckout = await Checkout.find({
    userId: new ObjectId(req?.user?.userId),
  })
    .populate("userId")
    .populate("products");

  res.send(userCheckout);
};
