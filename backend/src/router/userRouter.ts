import { Router } from "express";

import { getOne, createOne } from "../controller/userController";

const router = Router();

// POST http://localhost:4242/api/users
router.post("/", createOne);

// GET http://localhost:4242/api/users/1
router.get("/:id", getOne);

export default router;
