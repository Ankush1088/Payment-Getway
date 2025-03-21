import express from 'express';
import dotenv from 'dotenv';
import Razorpay from 'razorpay'
import Payment from "./Router/productRouter.js"
import cors from 'cors';


dotenv.config({path:'./config/config.env'});
const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(cors({
  origin: ["https://payment-getway-client-side.vercel.app", "http://localhost:3000"], // Allow local testing
    methods: "GET,POST,PUT,DELETE",
  credentials: true
}));


 export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET_KEY,
  
});
// Check if environment variables are loaded
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("RAZORPAY_API_KEY:", process.env.RAZORPAY_API_KEY)
//app.post("/paymentprocess",Router);
app.use('/api/payment', Payment); 



const port= process.env.PORT || 1000;
app.listen(port,() => {
  console.log(`server is start ${port}`);
})
