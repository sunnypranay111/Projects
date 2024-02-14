const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const productRoute = require('./routes/productRoutes');

dotenv.config();

mongoose.connect(process.env.DB_Connection_String)
.then(()=>console.log("DB connection success")).catch((err)=>{
    console.log(err);
});

app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);

app.listen(process.env.PORT || 10000, ()=>{
    console.log(`Backend server is running`);
});