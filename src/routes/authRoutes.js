import express from "express";
import * as authController from "../controllers/authController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post('/register',authController.registUser);
router.post('/login',authController.loginUser)
router.get('/me',authMiddleware,roleMiddleware('user'),authController.profileUser);
router.delete("/logout",authController.logoutUser);
router.post('/refresh',authController.refreshAccess);


export default router;