import { Request, Response } from "express";

import { findOne, addOne } from "../model/userModel";
import validateUser from "../validator/userValidator";
import { hashPassword } from "../helper/argonHelper";

const getOne = async (req: Request, res: Response): Promise<void> => {
	const id = Number(req.params.id);
	if (Number.isNaN(id)) {
		res.status(400).json({ message: "Invalid id" });
		return;
	}

	try {
		const [user] = await findOne(id);
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

const createOne = async (req: Request, res: Response): Promise<void> => {
	try {
		const errors = validateUser(req.body);
		if (errors) {
			res.status(400).json(errors);
			return;
		}

		const hashedPassword = await hashPassword(req.body.password);

		const user = await addOne({
			username: req.body.name,
			email: req.body.email,
			password_hash: hashedPassword,
		});

		res.status(201).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

export { getOne, createOne };
