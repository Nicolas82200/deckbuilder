import { Router } from "express";
import authorization from "../middleware/auth";
import authRouter from "./authRouter";
import cardRouter from "./cardRouter";
import userRouter from "./userRouter";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);

router.use("/cards", authorization, cardRouter);

export default router;
