import { Router } from "express";

import { getAll } from "../controller/cardController";

const router = Router();

// GET http://localhost:4242/api/cards
router.get("/", getAll);

export default router;
