import axios from "axios";
import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		try {
			const response = await axios.post(
				"http://localhost:3000/api/auth/login",
				{ email, password },
				{ withCredentials: true }, // IMPORTANT : pour recevoir/envoyer le cookie
			);
			// Pas de localStorage : le cookie httpOnly fait tout le travail.
			if (response.status === 200) {
				navigate("/decks");
			}
		} catch (err) {
			console.error(err);
			setError("Identifiants invalides");
		}
	};

	return (
		<div>
			<form id="login" onSubmit={handleSubmit}>
				<h1>Login</h1>
				<p className="item">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</p>
				<p className="item">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</p>
				{error && <p style={{ color: "tomato" }}>{error}</p>}
				<p className="item">
					<input type="submit" value="Login" />
				</p>
				<p>
					Pas encore de compte ? <Link to="/register">Creer un compte</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
