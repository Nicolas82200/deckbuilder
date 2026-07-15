import { Request, Response } from "express";

import validateLogin from "../validator/loginValidator";
import { findByEmail } from "../model/userModel";
import { verifyPassword } from "../helper/argonHelper";
import { encodeJWT } from "../helper/jwtHelper";

const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const errors = validateLogin(req.body);
		if (errors) {
			res.status(400).json(errors);
			return;
		}

		const [users] = await findByEmail(req.body.email);
		if (!users) {
			res.status(401).json({ message: "Invalid credentials" });
			return;
		}

		const isValid = await verifyPassword(
			users.password_hash,
			req.body.password,
		);
		if (!isValid) {
			res.status(401).json({ message: "Invalid credentials" });
			return;
		}

		const safeUser = {
			id: users.id,
			name: users.username,
			email: users.email,
		};
		const token = encodeJWT(safeUser);

		res.cookie("auth_token", `Bearer ${token}`, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 60 * 1000,
		});

		res.status(200).json({ users: safeUser });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

const logout = (req: Request, res: Response): void => {
	res.clearCookie("auth_token").sendStatus(200);
};

const authVerif = (req: Request, res: Response): void => {
	res.status(200).json({ authValid: true, users: req.user });
};

export { login, logout, authVerif };
