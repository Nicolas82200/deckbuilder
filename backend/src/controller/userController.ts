import { Request, Response } from "express";

import { findOne, addOne } from "../model/userModel";
import validateUser from "../validator/userValidator";
import { hashPassword } from "../helper/argonHelper";

// Le controller orchestre : il lit req, appelle model/helpers, répond res.
// Il ne fait JAMAIS de SQL lui-même.
// Astuce TS : on écrit "res....(); return;" (pas "return res....") car un
// handler doit renvoyer void en mode strict.

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
    // 1. valider les données reçues
    const errors = validateUser(req.body);
    if (errors) {
      res.status(400).json(errors);
      return;
    }

    // 2. hasher le mot de passe (jamais en clair en base)
    const hashedPassword = await hashPassword(req.body.password);

    // 3. enregistrer via le model
    const user = await addOne({ ...req.body, password: hashedPassword });

    // 4. répondre (sans le mot de passe)
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getOne, createOne };
