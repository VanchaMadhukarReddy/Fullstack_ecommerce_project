const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  pid: { type: Number, required: true },
  userid: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  totalprice: { type: Number },
});
productSchema.pre("save", function (next) {
  this.totalprice = this.price * this.qty;
  next();
});

module.exports = mongoose.model("cartitems", productSchema);
