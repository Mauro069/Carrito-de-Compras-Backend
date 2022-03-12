const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  inCart: { type: Boolean, default: false },
  price: { type: Number, required: true },
});

module.exports = model("Product", ProductSchema);
