const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoutes');
const categoryRoute = require('./routes/categoryRoutes');

//midlewares
const app = express();
dotenv.config();
app.use(express.json());

//Routes
app.use('/products', productRoute);
app.use('/category', categoryRoute);

//Databace Connection
mongoose.connect(process.env.DB_STRING)
.then(() => console.log(`database connected successfully.`))
.catch(error => console.log({message : `Unable to connect to the database`, error}));

//Server
app.listen(process.env.PORT, () => console.log(`server listing on ${process.env.PORT}`));