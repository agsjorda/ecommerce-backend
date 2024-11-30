const express = require('express');


const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');

const PORT = 3000;
const api = process.env.API_URL;
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/eshop-database';
const productRouter = require('./routes/products');

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routers
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
