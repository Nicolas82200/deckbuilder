import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import DeckBuilder from "./pages/DeckBuilder";
import type { CardData } from "./types";
import "./App.css";

type View = "gallery" | "deckbuilder";

function App() {
	const [cards, setCards] = useState<CardData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [view, setView] = useState<View>("gallery");
	const [saveStatus, setSaveStatus] = useState<string | null>(null);

	useEffect(() => {
		axios
			.get<CardData[]>("/api/cards")
			.then((response) => {
				setCards(response.data);
			})
			.catch((err) => {
				console.error(err);
				setError("Impossible de charger les cartes depuis la base Wyrdane.");
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	function handleSaveDeck(payload: {
		name: string;
		entries: { card: CardData; quantity: number }[];
	}) {
		setSaveStatus("Enregistrement...");
		axios
			.post("/api/decks", {
				name: payload.name || "Deck sans nom",
				cards: payload.entries.map((e) => ({
					card_id: e.card.id,
					quantity: e.quantity,
				})),
			})
			.then(() => {
				setSaveStatus("Deck enregistré !");
			})
			.catch((err) => {
				console.error(err);
				setSaveStatus("Échec de l'enregistrement du deck.");
			})
			.finally(() => {
				setTimeout(() => setSaveStatus(null), 3000);
			});
	}

	return (
		<main className="app">
			<DeckBuilder
				cards={cards}
				onBack={() => setView("gallery")}
				onSaveDeck={handleSaveDeck}
			/>
			{saveStatus && <div className="save-toast">{saveStatus}</div>}
		</main>
	);
}

export default App;
