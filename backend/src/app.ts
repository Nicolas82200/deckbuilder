import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./router";

const app = express();

// CORS : autorise le front à appeler l'API.
// credentials: true est INDISPENSABLE pour que le cookie circule en cross-origin.
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	}),
);

// Permet de lire le JSON envoyé dans le body des requêtes
app.use(express.json());

// Permet de lire les cookies envoyés par le navigateur (req.cookies)
app.use(cookieParser());

// Route de test
app.get("/", (req: Request, res: Response) => {
	res.status(200).json({ message: "API WildWalker - up & running" });
});

// Toutes les routes de l'API sont préfixées par /api
app.use("/api", router);

// 404 : aucune route ne correspond
app.use((req: Request, res: Response) => {
	res.status(404).json({ message: "Not Found" });
});

export default app;
