const express = require('express');


const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const PORT = 3000;
const api = process.env.API_URL;
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/eshop-database';
const productRouter = require('./routes/products');

app.use(cors());
app.options('*', cors());

//Middleware
app.use(express.json()); // express.json() is a middleware that parses the request body and makes it available under req.body
app.use(morgan('tiny')); // morgan is a middleware that logs the request details

//Routes
app.use(`${api}/products`, productRouter);

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
