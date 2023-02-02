import express, { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} from "../controllers/productController.js";
import { isAuthenicatorUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenicatorUser, authorizeRoles("admin"), getAdminProducts);

router.route("/admin/product/new").post(isAuthenicatorUser, createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenicatorUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenicatorUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getSingleProduct);

router.route("/review").put(isAuthenicatorUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenicatorUser, deleteReview);

export default router;
