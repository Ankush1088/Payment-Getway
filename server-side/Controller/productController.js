import { instance } from "../index.js";
import crypto from 'crypto';

export const processPayment = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      message: 'Payment Processed Successfully!',
      order,
    });
  } catch (error) {
    console.error("Payment Processing Error:", error);
    res.status(500).json({ success: false, message: "Payment Processing Failed" });
  }
};

export const getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
  });
};

export const paymentVerification = async (req, res) => {
   console.log("Payment Verification Triggered");
  console.log("Received Body:", req.body);
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  console.log("Expected Signature:", expectedSignature);
  console.log("Received Signature:", razorpay_signature);
  console.log("Verification Status:", expectedSignature === razorpay_signature);

  if (expectedSignature === razorpay_signature) {
    //redirect
    return res.json(`${process.env.FRONTEND_URL}/PaymentsSuccess?reference=${razorpay_payment_id}`);
  } else {
    res.status(400).json({ success: false, message: "Invalid Signature" });
  }
};
