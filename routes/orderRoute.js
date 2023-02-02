const express = require("express");

const {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} = require("../controllers/orderController.js");

const router = express.Router();

const { isAuthenicatorUser, authorizeRoles } = require("../middleware/auth.js");

router.route("/order/new").post(isAuthenicatorUser, newOrder);

router.route("/order/:id").get(isAuthenicatorUser, getSingleOrder);

router.route("/orders/me").get(isAuthenicatorUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenicatorUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenicatorUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenicatorUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
