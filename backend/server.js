const express = require('express');
const app = express();
const PORT = 3000;
const connectDB = require('./config/db')
const Userrouter = require('./routes/User')
const Transactionroute = require('./routes/TransactionRoute')

connectDB()
app.use(express.json())
app.use('/api',Userrouter);
app.use('/api',Transactionroute)
app.listen(PORT, ()=>{
    console.log('server started');
    
})