import express, { Router } from "express";
import {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/orderController.js";

import { isAuthenicatorUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

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

export default router;
