import express from 'express';
import dotenv from 'dotenv';
import Razorpay from 'razorpay'
import Payment from "./Router/productRouter.js"


dotenv.config({path:'./config/config.env'});
const app = express();


 export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET_KEY,
  
});

// Middleware
app.use(express.json()); 

//app.post("/paymentprocess",Router);
app.use('/api/payment', Payment); 

app.use(express.urlencoded({extended:true}));

const port= process.env.PORT || 1000;
app.listen(port,() => {
  console.log(`server is start ${port}`);
})