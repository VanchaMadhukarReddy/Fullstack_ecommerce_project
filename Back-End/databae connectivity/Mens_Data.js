const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  pid: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true }, // 'women', 'men', 'kid'
  type: { type: String, required: true }, //shirt/tshirt
  price: { type: Number, required: true },
});

module.exports = mongoose.model("products", productSchema);
