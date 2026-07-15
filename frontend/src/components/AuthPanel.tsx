import axios from "axios";
import type { FormEvent } from "react";
import { useState } from "react";

import "./AuthPanel.css";

type Mode = "login" | "register";

type AuthPanelProps = {
	onCancel: () => void;
	onSuccess: () => void;
};

const AuthPanel = ({ onCancel, onSuccess }: AuthPanelProps) => {
	const [mode, setMode] = useState<Mode>("login");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const resetFeedback = () => {
		setError("");
		setSuccess("");
	};

	const switchMode = (next: Mode) => {
		setMode(next);
		resetFeedback();
	};

	const handleLogin = async () => {
		try {
			const response = await axios.post(
				"http://localhost:3000/api/auth/login",
				{ email, password },
				{ withCredentials: true },
			);
			if (response.status === 200) {
				onSuccess();
			}
		} catch (err) {
			console.error(err);
			setError("Identifiants invalides");
		}
	};

	const handleRegister = async () => {
		try {
			const response = await axios.post("http://localhost:3000/api/users", {
				name,
				email,
				password,
			});
			if (response.status === 201) {
				setSuccess("Compte cree ! Connectez-vous.");
				setTimeout(() => switchMode("login"), 1000);
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

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetFeedback();
		if (mode === "login") handleLogin();
		else handleRegister();
	};

	return (
		<div className="auth-panel">
			<button type="button" className="auth-back" onClick={onCancel}>
				← Retour
			</button>

			<h2>{mode === "login" ? "Connectez-vous" : "Creation de compte"}</h2>

			<form onSubmit={handleSubmit}>
				{mode === "register" && (
					<p className="item">
						<label htmlFor="auth-name">Nom</label>
						<input
							type="text"
							id="auth-name"
							minLength={3}
							maxLength={100}
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</p>
				)}
				<p className="item">
					<label htmlFor="auth-email">Email</label>
					<input
						type="email"
						id="auth-email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</p>
				<p className="item">
					<label htmlFor="auth-password">Password</label>
					<input
						type="password"
						id="auth-password"
						minLength={8}
						maxLength={42}
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</p>

				{error && <p className="modal-error">{error}</p>}
				{success && <p className="modal-success">{success}</p>}

				<p className="item">
					<input
						type="submit"
						value={mode === "login" ? "Login" : "Creer le compte"}
					/>
				</p>
			</form>

			<p>
				{mode === "login" ? (
					<>
						Pas encore de compte ?{" "}
						<button type="button" onClick={() => switchMode("register")}>
							Creer un compte
						</button>
					</>
				) : (
					<>
						Deja inscrit ?{" "}
						<button type="button" onClick={() => switchMode("login")}>
							Se connecter
						</button>
					</>
				)}
			</p>
		</div>
	);
};

export default AuthPanel;
