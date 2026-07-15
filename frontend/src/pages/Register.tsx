import axios from "axios";
import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		try {
			const response = await axios.post("http://localhost:3000/api/users", {
				name,
				email,
				password,
			});

			if (response.status === 201) {
				setSuccess("Compte cree. Redirection vers la connexion...");
				setTimeout(() => navigate("/login"), 1000);
			}
		} catch (err) {
			console.error(err);
			if (axios.isAxiosError(err) && err.response?.status === 400) {
				setError("Verifie les informations saisies");
				return;
			}
			setError("Impossible de creer le compte");
		}
	};

	return (
		<div>
			<form id="login" onSubmit={handleSubmit}>
				<h1>Creation de compte</h1>
				<p className="item">
					<label htmlFor="name">Nom</label>
					<input
						type="text"
						name="name"
						id="name"
						minLength={3}
						maxLength={100}
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</p>
				<p className="item">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						required
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
						minLength={8}
						maxLength={42}
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</p>
				{error && <p className="error">{error}</p>}
				{success && <p className="success">{success}</p>}
				<p className="item">
					<input type="submit" value="Creer le compte" />
				</p>
				<p>
					Deja inscrit ? <Link to="/login">Se connecter</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
