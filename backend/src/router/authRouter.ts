import { Router } from "express";

import { login, logout, authVerif } from "../controller/authController";
import authorization from "../middleware/auth";

const router = Router();

router.post("/login", login);

router.get("/logout", logout);

router.get("/authVerif", authorization, authVerif);

export default router;
