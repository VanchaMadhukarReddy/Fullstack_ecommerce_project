const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  pid: { type: Number, required: true },
  userid: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("favourites", productSchema);
