const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true
  }
});

exports.Product = mongoose.model('Products', productSchema);