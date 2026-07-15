import { JwtPayload } from "jsonwebtoken";

export interface User {
	id: number;
	username: string;
	email: string;
	password_hash: string;
}

export interface Cards {
	id: number;
	name: string;
	race: string;
	card_type: number;
	lane: string | null;
	cost: number;
	attack: number | null;
	hp: number | null;
	rarity: string;
	charges: number | null;
	effect: string | null;
	flavor: string | null;
	image_path: string;
}

// Déclaration de module : on ajoute la propriété `user` au type Request
// d'Express, pour pouvoir écrire req.user dans le middleware d'auth.
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		interface Request {
			user?: string | JwtPayload;
		}
	}
}
