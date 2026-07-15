import { RowDataPacket } from "mysql2";

import db from "./db";
import { Cards } from "../types";

interface CardsRow extends Cards, RowDataPacket {}

const findAll = async (): Promise<CardsRow[]> => {
	const [rows] = await db.query<CardsRow[]>("SELECT * FROM `cards`");
	return rows;
};

console.log(findAll);

export { findAll };
