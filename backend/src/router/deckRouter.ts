import { Router } from "express";

import { getUserDecks } from "../controller/deckCtonroller";

const router = Router();

router.get("/", getUserDecks);

export default router;
