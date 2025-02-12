const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  pid: { type: Number },
  userid: { type: Number, required: true },
  name: { type: String },
  category: { type: String }, // 'women', 'men', 'kid'
  type: { type: String }, //shirt/tshirt
  price: { type: Number },
});

module.exports = mongoose.model("drafts", productSchema);
