const express = require('express');
const userRouter = require('./routes/userRoutes');

const PORT = 3999;


const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.listen(PORT, ()=>console.log(`Server Running on http://localhost:${PORT}`));
