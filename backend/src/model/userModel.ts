import { RowDataPacket, ResultSetHeader } from "mysql2";

import db from "./db";
import { User } from "../types";

// Le model est la SEULE couche qui parle à la base de données.
// Il ne connaît ni req ni res : il reçoit des données, il en retourne.

// Une ligne SQL renvoyée par mysql2 doit étendre RowDataPacket
interface UserRow extends User, RowDataPacket {}

const findOne = async (id: number): Promise<UserRow[]> => {
  // On ne sélectionne pas le password : inutile et sensible
  const [rows] = await db.query<UserRow[]>(
    "SELECT id, name, email FROM `user` WHERE id = ?",
    [id]
  );
  return rows;
};

const findByEmail = async (email: string): Promise<UserRow[]> => {
  // Ici on a besoin du password (pour le login) -> on prend tout
  const [rows] = await db.query<UserRow[]>(
    "SELECT * FROM `user` WHERE email = ?",
    [email]
  );
  return rows;
};

const addOne = async ({ name, email, password }: Omit<User, "id">) => {
  const [result] = await db.query<ResultSetHeader>(
    "INSERT INTO `user` (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return { id: result.insertId, name, email };
};

export { findOne, findByEmail, addOne };
