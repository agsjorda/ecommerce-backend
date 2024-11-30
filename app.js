const express = require('express');

require('dotenv/config');

const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const PORT = 3000;
const api = process.env.API_URL;
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/eshop-database';

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  countInStock: Number
});

const Product = mongoose.model('Products', productSchema);

//http://localhost:3000/api/v1/products
app.get(`${api}/products`, async (req, res) => {
	const productList = await Product.find();

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

app.post(`${api}/products`, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
    console.log(savedProduct);
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false
    });
  }
});


mongoose.connect(CONNECTION_STRING, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'eshop-database'
}).then(() => {
  console.log('Database Connection is successful...');
}).catch((err) => {
  console.log(err);
});


app.listen(PORT, () => {
	console.log(`Your Default URL is ${api}`);
	console.log(`Server is running on port ${PORT}`);
});
