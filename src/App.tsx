import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Todos from "./components/Todos";
import Quotes from "./components/Quotes";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" index element={<Home />} />
				<Route path="/todos" element={<Todos />} />
				<Route path="/quotes" element={<Quotes />} />
			</Routes>
		</>
	);
}

export default App;
