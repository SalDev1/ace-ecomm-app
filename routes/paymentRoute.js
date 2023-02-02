const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController.js");
const { isAuthenicatorUser } = require("../middleware/auth.js");

const router = express.Router();

router.route("/payment/process").post(isAuthenicatorUser, processPayment);

router.route("/stripeapikey").get(isAuthenicatorUser, sendStripeApiKey);

module.exports = router;
