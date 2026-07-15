import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await axios.get("http://localhost:3000/api/auth/logout", {
				withCredentials: true,
			});
			navigate("/login");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<h1>WildWalker</h1>
			<p>Page d'accueil (publique)</p>
			<nav style={{ display: "flex", gap: 16, justifyContent: "center" }}>
				<Link to="/login">Se connecter</Link>
				<Link to="/register">Creer un compte</Link>
				<Link to="/decks">Voir les films</Link>
				<button type="button" onClick={handleLogout}>
					Deconnexion
				</button>
			</nav>
		</div>
	);
};

export default Home;
