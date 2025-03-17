import express from 'express';
import { getKey, paymentVerification, processPayment } from '../Controller/productController.js';

const router = express.Router();

router.post("/paymentprocess", processPayment);
router.get("/getKey", getKey);
router.post("/paymentVerification", paymentVerification);

export default router;
