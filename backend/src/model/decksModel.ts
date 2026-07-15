import type { RowDataPacket } from "mysql2";
import db from "./db";

import type { Decks } from "../types";
import type { Cards } from "../types";
interface DeckCardRow extends Cards, RowDataPacket {}
interface DeckRow extends Decks, RowDataPacket {}

const findByUserId = async (userId: number): Promise<DeckRow[]> => {
	const [rows] = await db.query<DeckRow[]>(
		"SELECT id, user_id, name, created_at FROM decks WHERE user_id = ? ORDER BY created_at DESC",
		[userId],
	);
	return rows;
};

const findCardsByDeckId = async (deckId: number): Promise<DeckCardRow[]> => {
	const [rows] = await db.query<DeckCardRow[]>(
		`SELECT dc.deck_id, dc.card_id, dc.quantity,
		        c.name, c.race, c.card_type, c.lane, c.cost,
		        c.attack, c.hp, c.rarity, c.charges, c.effect, c.flavor, c.image_path
		 FROM deck_cards dc
		 JOIN cards c ON c.id = dc.card_id
		 WHERE dc.deck_id = ?`,
		[deckId],
	);
	return rows;
};

export { findByUserId, findCardsByDeckId };
