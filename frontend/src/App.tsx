import { Outlet } from "react-router-dom";

import "./App.css";

// App = la coquille commune à toutes les pages.
// <Outlet /> est l'endroit où react-router affiche la page courante.
function App() {
	return <Outlet />;
}

export default App;
