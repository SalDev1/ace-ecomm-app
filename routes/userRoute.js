import express, { Router } from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateUserProfile,
  updateUserRole,
} from "../controllers/userController.js";
import { isAuthenicatorUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/me").get(isAuthenicatorUser, getUserDetails);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").post(logoutUser);
router.route("/password/update").put(isAuthenicatorUser, updatePassword);
router.route("/me/update").put(isAuthenicatorUser, updateUserProfile);

router
  .route("/admin/users")
  .get(isAuthenicatorUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenicatorUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenicatorUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenicatorUser, authorizeRoles("admin"), deleteUser);

export default router;
