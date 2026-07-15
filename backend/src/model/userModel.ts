import { RowDataPacket, ResultSetHeader } from "mysql2";

import db from "./db";
import { User } from "../types";

interface UserRow extends User, RowDataPacket {}

const findOne = async (id: number): Promise<UserRow[]> => {
	const [rows] = await db.query<UserRow[]>(
		"SELECT id, username, email FROM `users` WHERE id = ?",
		[id],
	);
	return rows;
};

const findByEmail = async (email: string): Promise<UserRow[]> => {
	const [rows] = await db.query<UserRow[]>(
		"SELECT * FROM `users` WHERE email = ?",
		[email],
	);
	return rows;
};

const addOne = async ({
	username,
	email,
	password_hash,
}: {
	username: string;
	email: string;
	password_hash: string;
}) => {
	const [result] = await db.query<ResultSetHeader>(
		"INSERT INTO `users` (username, email, password_hash) VALUES (?, ?, ?)",
		[username, email, password_hash],
	);
	return { id: result.insertId, username, email };
};

export { findOne, findByEmail, addOne };
