import express from "express";
import {
  processPayment,
  sendStripeApiKey,
} from "../controllers/paymentController.js";
import { isAuthenicatorUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/payment/process").post(isAuthenicatorUser, processPayment);

router.route("/stripeapikey").get(isAuthenicatorUser, sendStripeApiKey);
export default router;
