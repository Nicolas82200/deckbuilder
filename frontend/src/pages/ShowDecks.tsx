import axios from "axios";
import { useEffect, useState } from "react";

interface Deck {
	id: number;
	title: string;
	description: string;
}

const ShowDecks = () => {
	const [Decks, setDecks] = useState<Deck[]>([]);

	useEffect(() => {
		const getDecks = async () => {
			try {
				const response = await axios.get<Deck[]>(
					"http://localhost:3000/api/Decks",
					{ withCredentials: true },
				);
				setDecks(response.data);
			} catch (err) {
				console.error(err);
			}
		};
		getDecks();
	}, []);

	return (
		<div>
			<h1>Films</h1>
			{Decks.map((deck) => (
				<div key={deck.id}>
					<h2>{deck.title}</h2>
					<p>{deck.description}</p>
				</div>
			))}
		</div>
	);
};

export default ShowDecks;
