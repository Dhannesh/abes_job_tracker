import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.mjs";
import {
  login,
  register,
  updateUser,
} from "../controllers/auth.controller.mjs";
import testUserMiddleware from "../middleware/testUser.middleware.mjs";
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1,
  message: {
    msg: "Too many requests from this IP, please try again after 15 minutes",
  },
});

const authRouter = Router();
authRouter.post("/register", apiLimiter, register);
authRouter.post("/login", apiLimiter, login);
authRouter.patch("/updateUser", authMiddleware, testUserMiddleware, updateUser);

export default authRouter;
