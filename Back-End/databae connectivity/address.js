const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: Number, required: true },
  country: { type: String, required: true },
});

module.exports = mongoose.model("addresses", productSchema);
