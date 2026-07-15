import { Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";

import { findByUserId, findCardsByDeckId } from "../model/decksModel";

const getUserId = (req: Request): number | null => {
	const payload = req.user as JwtPayload | undefined;
	if (!payload || typeof payload.id === "undefined") return null;
	const id = Number(payload.id);
	return Number.isNaN(id) ? null : id;
};

const getUserDecks = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = getUserId(req);
		if (!userId) {
			res.status(401).json({ message: "Non authentifié" });
			return;
		}

		const decks = await findByUserId(userId);

		const decksWithCards = await Promise.all(
			decks.map(async (deck) => {
				const cards = await findCardsByDeckId(deck.id);
				return { ...deck, cards };
			}),
		);

		res.status(200).json(decksWithCards);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

export { getUserDecks };
