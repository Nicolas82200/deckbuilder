import { Request, Response } from "express";

import validateLogin from "../validator/loginValidator";
import { findByEmail } from "../model/userModel";
import { verifyPassword } from "../helper/argonHelper";
import { encodeJWT } from "../helper/jwtHelper";

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. valider les données
    const errors = validateLogin(req.body);
    if (errors) {
      res.status(400).json(errors);
      return;
    }

    // 2. retrouver l'utilisateur par email
    const [user] = await findByEmail(req.body.email);
    // Message volontairement vague : on ne dit pas si c'est l'email
    // ou le mot de passe qui est faux.
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // 3. comparer le mot de passe
    const isValid = await verifyPassword(user.password, req.body.password);
    if (!isValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // 4. générer le token (sans le mot de passe dans le payload)
    const safeUser = { id: user.id, name: user.name, email: user.email };
    const token = encodeJWT(safeUser);

    // 5. poser le token dans un cookie httpOnly :
    //    - httpOnly  : inaccessible au JS du navigateur (protège du vol par XSS)
    //    - secure    : envoyé uniquement en HTTPS (donc seulement en production)
    //    - sameSite  : limite l'envoi du cookie aux requêtes du même site (anti-CSRF)
    res.cookie("auth_token", `Bearer ${token}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1h, comme l'expiration du token
    });

    res.status(200).json({ user: safeUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = (req: Request, res: Response): void => {
  res.clearCookie("auth_token").sendStatus(200);
};

// Route protégée : si on arrive ici, c'est que le middleware a validé le token
const authVerif = (req: Request, res: Response): void => {
  res.status(200).json({ authValid: true, user: req.user });
};

export { login, logout, authVerif };
