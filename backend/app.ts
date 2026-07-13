import fs from "node:fs";
import path from "node:path";
import express from "express";

const app = express();

const publicFolderPath = path.join(__dirname, "../../database/public");

if (fs.existsSync(publicFolderPath)) {
	app.use(express.static(publicFolderPath));
}

const assetsFolderPath = path.join(__dirname, "../../");

if (fs.existsSync(assetsFolderPath)) {
	app.use("/assets", express.static(assetsFolderPath));
}

const clientBuildPath = path.join(__dirname, "../../client/dist");

if (fs.existsSync(clientBuildPath)) {
	app.use(express.static(clientBuildPath));

	app.get("*", (_req, res) => {
		res.sendFile("index.html", { root: clientBuildPath });
	});
}

export default app;
