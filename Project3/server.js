const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const router = require('./routes/router');


const app = express();
dotenv.config();
app.use(express.json());

mongoose
.connect(process.env.DB_String)
.then(() => {
    console.log(`Database connected successfully`);
})
.catch((err) => {
    console.log(err);
});

app.use('/', router)

app.listen(process.env.PORT, () => {
   console.log(`Server running on ${process.env.PORT}`); 
})