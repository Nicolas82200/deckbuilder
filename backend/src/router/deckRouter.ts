import { Router } from "express";

import { getUserDecks, getOne, save } from "../controller/deckController";

const router = Router();

router.get("/", getUserDecks);
router.get("/:id", getOne);
router.post("/", save);
router.put("/:id", save);

export default router;
