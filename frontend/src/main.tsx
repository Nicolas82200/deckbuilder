import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthRequire from "./helper/AuthRequire";

import "./index.css";
import DeckBuilder from "./pages/DeckBuilder";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/login", element: <Login /> },
			{ path: "/register", element: <Register /> },
			{
				path: "/decks",
				element: (
					<AuthRequire>
						<DeckBuilder />
					</AuthRequire>
				),
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
